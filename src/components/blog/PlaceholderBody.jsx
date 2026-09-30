import FaqBlock from './FaqBlock.jsx'

// Neutral placeholder article body, identical for every post. It exercises each rich-text
// element the original articles use (p, a, strong, em, h2, h3, ol, ul, table, blockquote,
// figure + figcaption, inline code, FAQ accordion). The article copy itself is not reproduced.

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

export const PLACEHOLDER_H2 = [
  'Lorem ipsum dolor sit amet',
  'Consectetur adipiscing elit',
  'Sed do eiusmod tempor',
  'Ut enim ad minim veniam',
  'Duis aute irure dolor',
  'Excepteur sint occaecat',
  'Curabitur pretium tincidunt',
]

const H2 = ({ i }) => (
  <h2 id={slugify(PLACEHOLDER_H2[i])} className="scroll-mt-24">
    {PLACEHOLDER_H2[i]}
  </h2>
)

const P1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const P2 =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
const P3 = 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum.'

const PLACEHOLDER_FAQ = [
  ['Lorem ipsum dolor sit amet?', P1],
  ['Consectetur adipiscing elit sed do eiusmod?', P2],
  ['Ut enim ad minim veniam quis nostrud?', P3 + ' ' + P2],
  ['Duis aute irure dolor in reprehenderit?', P1],
  ['Excepteur sint occaecat cupidatat non proident?', P3],
]

export const PLACEHOLDER_TAKEAWAYS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
]

const TH = 'text-strong border px-4 py-3 font-medium md:px-6 md:py-4 border-pink-4'
const TD = 'border-border border px-4 py-3 md:px-6 md:py-4'

export default function PlaceholderBody({ figure }) {
  return (
    <>
      <p>
        <a href="/blog">Lorem ipsum</a> dolor sit amet, <em>consectetur</em> adipiscing elit. Sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua, ut enim ad minim veniam.
      </p>
      <p>{P1}</p>
      <p>
        {P3} <strong>Nullam quis risus eget urna mollis ornare</strong> vel eu leo.
      </p>
      <H2 i={0} />
      <p>{P1}</p>
      <p>{P2}</p>
      <H2 i={1} />
      <p>{P3}</p>
      <ol>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li>Sed do eiusmod tempor incididunt</li>
        <li>Ut labore et dolore magna aliqua</li>
        <li>Quis nostrud exercitation ullamco</li>
      </ol>
      <p>{P2}</p>
      <h3>1. Lorem ipsum dolor sit</h3>
      <p>{P1}</p>
      <table className="not-prose w-full text-left text-sm">
        <thead>
          <tr className="bg-pink-2">
            <th className={TH} scope="col">
              <p>
                <strong>Lorem ipsum</strong>
              </p>
            </th>
            <th className={TH} scope="col">
              <p>
                <strong>Dolor sit amet</strong>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Consectetur', 'Adipiscing elit sed do eiusmod'],
            ['Tempor', 'Incididunt ut labore et dolore magna aliqua'],
            ['Ut enim', 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'],
            ['Duis aute', 'Irure dolor in reprehenderit'],
          ].map(([a, b]) => (
            <tr key={a}>
              <td className={TD}>
                <p>
                  <strong>{a}</strong>
                </p>
              </td>
              <td className={TD}>
                <p>{b}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{P2}</p>
      <h3>2. Consectetur adipiscing elit</h3>
      <p>{P3}</p>
      <ul>
        <li>
          <strong>Lorem ipsum:</strong> dolor sit amet, consectetur adipiscing elit.
        </li>
        <li>
          <strong>Sed do eiusmod:</strong> tempor incididunt ut labore et dolore magna aliqua.
        </li>
        <li>
          <strong>Ut enim:</strong> ad minim veniam, quis nostrud exercitation.
        </li>
        <li>
          <strong>Duis aute:</strong> irure dolor in reprehenderit in voluptate.
        </li>
      </ul>
      <p>{P1}</p>
      <h3>3. Sed do eiusmod tempor</h3>
      <p>{P3}</p>
      <blockquote>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </blockquote>
      <p>{P2}</p>
      <H2 i={2} />
      <p>{P1}</p>
      {figure && (
        <figure>
          <img
            src={figure}
            alt=""
            width="1400"
            height="1400"
            style={{ width: 400, maxWidth: '100%' }}
            className="mx-auto"
            loading="lazy"
          />
          <figcaption className="mt-2.5 text-center text-sm text-muted-foreground lg:mt-3">
            Lorem ipsum dolor sit amet
          </figcaption>
        </figure>
      )}
      <p>{P3}</p>
      <H2 i={3} />
      <p>{P2}</p>
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Consectetur adipiscing elit</li>
        <li>Sed do eiusmod tempor</li>
      </ul>
      <p>
        Ut enim ad minim veniam, use <code>lorem.ipsum()</code> quis nostrud exercitation ullamco laboris.
      </p>
      <H2 i={4} />
      <p>{P1}</p>
      <p>{P3}</p>
      <H2 i={5} />
      <p>{P2}</p>
      <H2 i={6} />
      <p>{P1}</p>
      <p>{P3}</p>
      <FaqBlock items={PLACEHOLDER_FAQ} />
    </>
  )
}
