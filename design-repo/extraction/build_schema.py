#!/usr/bin/env python3
"""Generate schema/pagespec.schema.json from the design-repo contracts.

Inputs (all under the repo root, derived from this file's location):
  sections/*.json, templates/templates.json, assets/asset-roles.json
Output:
  schema/pagespec.schema.json  (JSON Schema draft-07, deterministic bytes)

Stdlib only. Re-run and byte-compare for a drift check.

Contract keys that describe the contract rather than the PageSpec (behaviour,
themeDependency, additionalMotion at contract level is used ONLY to widen the
allowed motion patterns, per-field note / measuredFrom / description, content
level note) are ignored when building content schemas.
"""
import glob
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MOTION_PATTERNS = [
    "none", "popover-fade-scale", "accordion-height-opacity", "marquee",
    "progress-carousel", "scroll-linked-sticky-story", "notification-stack",
    "dialog-overlay", "hover-preview-video", "auto-advance-accordion",
    "hover-color-transition",
]
FALLBACKS = ["static", "instant", "first-frame", "pause", "none-needed"]


def load(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        return json.load(fh)


def string_schema(spec):
    s = {"type": "string", "minLength": 1}
    if "maxWords" in spec:
        s["x-maxWords"] = spec["maxWords"]
    if spec["type"] == "richtext-inline":
        s["x-richtext"] = "inline"
    return s


def field_schema(spec, roles, where):
    """Turn one contract field spec into a closed JSON Schema fragment."""
    t = spec["type"]
    if t in ("string", "richtext-inline"):
        if spec.get("kind") == "route-or-url":
            return {"$ref": "#/definitions/routeOrUrl"}
        return string_schema(spec)
    if t == "route-or-url":
        return {"$ref": "#/definitions/routeOrUrl"}
    if t == "number":
        return {"type": "number"}
    if t == "boolean":
        return {"type": "boolean"}
    if t == "enum":
        return {"enum": list(spec["values"])}
    if t == "assetRef":
        role = spec["assetRole"]
        if role not in roles:
            raise SystemExit("unknown asset role %r at %s" % (role, where))
        return {"$ref": "#/definitions/assetRef.%s" % role}
    if t == "object":
        return object_schema(spec.get("fields", {}), roles, where)
    if t == "array":
        s = {"type": "array"}
        if "minItems" in spec:
            s["minItems"] = spec["minItems"]
        if "maxItems" in spec:
            s["maxItems"] = spec["maxItems"]
        item = spec["items"]
        if "allowedBlocks" in spec:
            s["items"] = {"oneOf": block_variants(spec["allowedBlocks"], roles, where)}
        else:
            s["items"] = field_schema(item, roles, where + "[]")
        return s
    raise SystemExit("unhandled type %r at %s" % (t, where))


def object_schema(fields, roles, where):
    props, req = {}, []
    for name in sorted(fields):
        props[name] = field_schema(fields[name], roles, where + "." + name)
        if fields[name].get("required"):
            req.append(name)
    out = {"type": "object", "additionalProperties": False, "properties": props}
    if req:
        out["required"] = req
    return out


def block_variants(blocks, roles, where):
    """Body blocks (content.post-article). The contract only declares the
    `block` discriminator; the per-block payload keys are the generator's
    minimal inference (documented in the build report)."""
    out = []
    for b in blocks:
        name = b["block"]
        mw = b.get("maxWords")

        def txt():
            s = {"type": "string", "minLength": 1}
            if mw is not None:
                s["x-maxWords"] = mw
            return s
        props = {"block": {"const": name}}
        req = ["block"]
        if name in ("p", "h2", "h3", "blockquote", "code-inline"):
            props["text"] = txt()
            req.append("text")
        elif name in ("ol", "ul"):
            props["items"] = {"type": "array", "minItems": 1, "items": txt()}
            req.append("items")
        elif name == "table":
            props["rows"] = {"type": "array", "minItems": 1, "items": {
                "type": "array", "minItems": 2, "maxItems": 2, "items": txt()}}
            req.append("rows")
        elif name == "figure":
            role = b["assetRole"]
            props["image"] = {"$ref": "#/definitions/assetRef.%s" % role}
            props["caption"] = txt()
            req += ["image", "caption"]
        elif name == "faq-accordion":
            props["title"] = {"type": "string", "minLength": 1, "x-maxWords": 8}
            props["questions"] = {"type": "array", "minItems": 1, "maxItems": 5, "items": {
                "type": "object", "additionalProperties": False,
                "properties": {"question": {"type": "string", "minLength": 1, "x-maxWords": 8},
                               "answer": {"type": "string", "minLength": 1, "x-maxWords": mw}},
                "required": ["question", "answer"]}}
            req.append("questions")
        else:
            raise SystemExit("unhandled block %r at %s" % (name, where))
        out.append({"type": "object", "additionalProperties": False,
                    "properties": props, "required": sorted(req)})
    return out


def motion_shape(extra_context):
    props = {
        "pattern": {"enum": MOTION_PATTERNS},
        "reducedMotionFallback": {"enum": FALLBACKS},
        "durationMs": {"type": "integer", "minimum": 0},
        "easing": {"type": "string", "minLength": 1},
        "intervalMs": {"type": "integer", "minimum": 0},
        "speedPxPerSec": {"type": "number", "minimum": 0},
        "inViewThreshold": {"type": "number", "minimum": 0, "maximum": 1},
    }
    req = ["pattern", "reducedMotionFallback"]
    if extra_context:
        props["context"] = {"type": "string", "minLength": 1}
        req.append("context")
    return {"type": "object", "additionalProperties": False,
            "properties": props, "required": sorted(req)}


def build():
    templates = load("templates/templates.json")
    roles_doc = load("assets/asset-roles.json")
    roles = sorted(roles_doc["roles"])
    tpl_ids = sorted(t["id"] for t in templates["templates"])

    sections = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "sections", "*.json"))):
        with open(path, encoding="utf-8") as fh:
            c = json.load(fh)
        sections[c["id"]] = c
    ids = sorted(sections)

    definitions = {
        "routeOrUrl": {
            "type": "string",
            "pattern": r"^(/|https?://|mailto:|tel:|#)\S*$",
            "description": "Internal route (leading /), absolute http(s) URL, mailto:, tel: or #anchor.",
        },
        "cta": {
            "type": "object", "additionalProperties": False,
            "description": "Reference shape of a call-to-action. Per-section ctas are inlined "
                           "with their own x-maxWords budgets.",
            "properties": {
                "label": {"type": "string", "minLength": 1},
                "href": {"$ref": "#/definitions/routeOrUrl"},
                "variant": {"enum": ["primary", "outline"]},
            },
            "required": ["label", "href"],
        },
        "motion": motion_shape(False),
    }
    definitions["motion"]["properties"]["additionalMotion"] = {
        "type": "array", "minItems": 1, "items": motion_shape(True)}
    for r in roles:
        definitions["assetRef.%s" % r] = {
            "type": "object", "additionalProperties": False,
            "properties": {"assetRole": {"const": r},
                           "ref": {"type": "string", "minLength": 1}},
            "required": ["assetRole", "ref"],
        }

    branches = []
    for sid in ids:
        c = sections[sid]
        allowed = [c["motion"]["pattern"]]
        for am in c.get("additionalMotion", []):
            if am["pattern"] not in allowed:
                allowed.append(am["pattern"])
        allowed = sorted(allowed)
        then = {
            "properties": {
                "content": object_schema(c["content"]["fields"], roles, sid),
                "motion": {"properties": {
                    "pattern": {"enum": allowed},
                    "additionalMotion": {"items": {"properties": {"pattern": {"enum": allowed}}}},
                }},
            },
        }
        vnames = [v["name"] for v in c.get("variants", [])]
        if vnames:
            then["properties"]["variant"] = {"enum": vnames}
        else:
            then["not"] = {"required": ["variant"]}
        branches.append({
            "if": {"properties": {"section": {"const": sid}}, "required": ["section"]},
            "then": then,
        })

    node = {
        "type": "object", "additionalProperties": False,
        "properties": {
            "section": {"enum": ids},
            "variant": {"type": "string", "minLength": 1},
            "content": {"type": "object"},
            "motion": {"$ref": "#/definitions/motion"},
        },
        "required": ["section", "content", "motion"],
        "allOf": branches,
    }
    return {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "pagespec.schema.json",
        "title": "Reevo PageSpec",
        "description": "Generated by extraction/build_schema.py from sections/*.json, "
                       "templates/templates.json and assets/asset-roles.json. Do not edit by hand.",
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "pageSpecVersion": {"const": "1.0.0"},
            "route": {"type": "string", "pattern": r"^(/\S*|\*)$"},
            "template": {"enum": tpl_ids},
            "title": {"type": "string", "minLength": 1},
            "nodes": {"type": "array", "minItems": 1, "items": {"$ref": "#/definitions/node"}},
        },
        "required": ["pageSpecVersion", "route", "template", "title", "nodes"],
        "definitions": dict(definitions, node=node),
    }


def main():
    schema = build()
    out = os.path.join(ROOT, "schema", "pagespec.schema.json")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(json.dumps(schema, indent=2, sort_keys=True, ensure_ascii=False) + "\n")
    print("wrote", os.path.relpath(out, ROOT), "branches:", len(schema["definitions"]["node"]["allOf"]))


if __name__ == "__main__":
    main()
