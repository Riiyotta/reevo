import { useState } from 'react'
import { ChevronRight, MousePointer2 } from 'lucide-react'
import { Button, Container, GRID, buttonClass, STACK } from '../ui.jsx'
import { MediaDialog } from '../dialog.jsx'

// Storylane embed (third-party). Desktop and mobile use different demos, as on the original.
function DemoDialog({ open, onClose }) {
  return (
    <MediaDialog
      open={open}
      onClose={onClose}
      label="Interactive Demo"
      className="w-[min(90vw,1240px,calc((100vh-24px)*var(--ar)))] [--ar:3/4] [aspect-ratio:var(--ar)] md:[--ar:16/9]"
    >
      <h2 className="sr-only">Interactive Demo</h2>
      <iframe
        loading="lazy"
        className="absolute inset-0 hidden h-full w-full md:block"
        src="https://app.storylane.io/demo/7dnsrqniygbj?embed=popup"
        name="sl-embed"
        title="Interactive Demo"
        allow="fullscreen"
        allowFullScreen
      />
      <iframe
        loading="lazy"
        className="absolute inset-0 h-full w-full md:hidden"
        src="https://app.storylane.io/demo/f4jod04vwp9m?embed=popup"
        name="sl-embed"
        title="Interactive Demo"
        allow="fullscreen"
        allowFullScreen
      />
    </MediaDialog>
  )
}

export default function TourDemo() {
  const [open, setOpen] = useState(false)
  return (
    <section>
      <Container>
        <div className={STACK}>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden">
                  <video playsInline autoPlay muted loop className="h-full w-full object-cover">
                    <source src="/assets/videos/tour-teaser.mp4" type="video/mp4" />
                  </video>
                </div>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={open}
                  onClick={() => setOpen(true)}
                  className="absolute inset-0 flex cursor-pointer items-end justify-end p-4"
                >
                  <div className={buttonClass({ variant: 'primary' })}>
                    <span className="inline-flex items-center justify-center">
                      <MousePointer2 className="size-4 shrink-0" />
                    </span>
                    Try the interactive demo
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
              <div className="rounded bg-blue-1 px-6 py-12 text-center md:px-12 md:py-16 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12 lg:text-left">
                <div className="lg:max-w-xl">
                  <p className="mb-3 block text-display-xl font-bold text-strong">Like what you saw?</p>
                  <p className="mx-auto mb-6 max-w-md text-strong/75 md:mb-8 lg:mx-0 lg:mb-0">
                    That's just the beginning. Book time with us to see the full platform, tailored to your team and
                    workflow.
                  </p>
                </div>
                <div className="mx-auto flex w-full max-w-[300px] justify-center lg:mx-0 lg:w-auto lg:max-w-none lg:shrink-0">
                  <Button
                    href="/product-tour/post-interactive-demo"
                    variant="primary"
                    icon={ChevronRight}
                    className="w-full lg:w-[338px]"
                  >
                    Schedule your custom demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <DemoDialog open={open} onClose={() => setOpen(false)} />
    </section>
  )
}
