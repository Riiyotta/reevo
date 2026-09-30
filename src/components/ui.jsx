import { InlineSvg, PLAY_PATHS, PLAY_VIEWBOX, WORDMARK_PATHS, WORDMARK_VIEWBOX } from './svgPaths.js'

// Shared primitives from CLONE_SPEC.md section 0 "Shared components".

export const GRID = 'grid grid-cols-6 gap-4 md:grid-cols-12 lg:grid-cols-24'

// Vertical rhythm between the blocks inside a section
export const STACK = 'space-y-10 md:space-y-16 lg:space-y-20 xl:space-y-24'

// Standard column spans used across sections
export const COL_LABEL = 'col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2'
export const COL_HEADLINE = 'col-span-6 md:col-span-9 lg:col-span-14 xl:col-span-12 xl:col-start-2'
export const COL_TEXT = 'col-span-6 md:col-span-5 lg:col-span-9 xl:col-span-8 xl:col-start-2'
export const COL_IMAGE = 'col-span-6 md:col-span-6 md:col-start-7 md:row-start-1 lg:col-span-14 lg:col-start-11'

// Horizontal scroll-snap carousel below md, flex row at md+ (spec section 11)
export const CAROUSEL =
  'flex -mx-6 px-2 scroll-pl-2 sm:-mx-8 sm:px-4 sm:scroll-pl-4 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:scroll-smooth md:mx-0 md:gap-4 md:px-0'
export const CAROUSEL_ITEM = 'shrink-0 pl-4 last:pr-4 max-md:snap-start md:min-w-0 md:flex-1 md:pl-0 md:last:pr-0'

export function Container({ className = '', children }) {
  return (
    <div className={`w-full px-6 sm:px-8 md:px-10 lg:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-[1400px]">{children}</div>
    </div>
  )
}

export function Eyebrow({ as: Tag = 'span', className = '', children }) {
  return <Tag className={`block font-mono text-display-xs uppercase text-strong ${className}`}>{children}</Tag>
}

export function Tag({ className = '', children }) {
  return (
    <span
      className={`inline-flex h-[21px] items-center justify-center rounded border border-border px-2 font-mono text-display-xs uppercase text-strong ${className}`}
    >
      {children}
    </span>
  )
}

const BUTTON_BASE =
  'relative inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap font-medium transition-all duration-200'
const BUTTON_VARIANTS = {
  primary: 'bg-primary text-primary-foreground hover:opacity-80',
  outline: 'border border-secondary-foreground bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10',
}
const BUTTON_SIZES = {
  lg: 'h-button justify-between gap-1.5 rounded-lg px-5 text-sm',
  sm: 'h-button-sm justify-center gap-1 rounded-sm px-3 text-xs',
}

export function buttonClass({ variant = 'primary', size = 'lg', className = '' } = {}) {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`
}

export function Button({ href, variant, size, className, icon: Icon, children, ...rest }) {
  const cls = buttonClass({ variant, size, className })
  const content = (
    <>
      {children}
      {Icon && (
        <span className="inline-flex size-4">
          <Icon className="size-4" />
        </span>
      )}
    </>
  )
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {content}
    </button>
  )
}

// Decorative pattern strip at the top of a section
export function PatternStrip({ src }) {
  return (
    <div className="absolute left-0 top-0 w-full" aria-hidden="true">
      <Container>
        <div className={GRID}>
          <div className="col-span-5 col-start-2 sm:col-span-4 sm:col-start-3 md:col-span-6 md:col-start-7 lg:col-span-12 lg:col-start-13">
            <div
              className="h-[60px] overflow-hidden bg-left bg-repeat [background-size:auto_60px] max-sm:-mr-6 md:h-[120px] md:[background-size:auto_120px]"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export function SectionLabel({ icon: Icon, children }) {
  return (
    <div className={GRID}>
      <div className={`${COL_LABEL} flex items-center gap-4`}>
        <span className="flex size-6 items-center justify-center bg-strong text-background">
          <Icon className="size-3 shrink-0" />
        </span>
        <Eyebrow as="h2">{children}</Eyebrow>
      </div>
    </div>
  )
}

export function Headline({ children, lede }) {
  return (
    <div className={GRID}>
      <div className={COL_HEADLINE}>
        <p className="text-pretty text-2xl text-strong">{children}</p>
        {lede && <p className="mt-3 text-lg text-foreground">{lede}</p>}
      </div>
    </div>
  )
}

// Section shell: padding, pattern strip, stacked content rhythm
// Page section shell. The original only adds the `pt-6 md:pt-0` offset when a pattern strip sits at the top.
export function Section({ id, className = '', pattern, stack = STACK, children }) {
  return (
    <section id={id} className={`relative py-16 md:py-24 lg:py-32 ${className}`}>
      {pattern && <PatternStrip src={pattern} />}
      <Container>
        <div className={`${stack} ${pattern ? 'pt-6 md:pt-0' : ''}`}>{children}</div>
      </Container>
    </section>
  )
}

export function Wordmark({ className = '' }) {
  return <InlineSvg viewBox={WORDMARK_VIEWBOX} paths={WORDMARK_PATHS} evenOddFirst className={className} />
}

export function PlayTriangle({ className = '' }) {
  return <InlineSvg viewBox={PLAY_VIEWBOX} paths={PLAY_PATHS} className={className} />
}

export function FeatureChip({ icon: Icon, color }) {
  return (
    <span className={`relative flex size-8 shrink-0 items-center justify-center rounded text-gray-10 ${color}`}>
      <Icon className="size-4" />
    </span>
  )
}
