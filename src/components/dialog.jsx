import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Presence } from './motion.jsx'

// Escape-to-close and page scroll lock while a modal is open; optionally focuses `focusRef` on open.
export function useModal(open, onClose, focusRef) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    focusRef?.current?.focus()
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, focusRef])
}

// Enter measured on reevo.ai (media dialogs): opacity 0 -> 1, scale .96 -> 1, y +8px -> 0, 200ms
// cubic-bezier(.4,0,.2,1); the overlay fades with it and both exit back to the hidden state.
const CENTER = 'translate(-50%, -50%)'
const HIDDEN = { opacity: 0, transform: `${CENTER} translateY(8px) scale(.96)` }
const SHOWN = { opacity: 1, transform: `${CENTER} translateY(0px) scale(1)` }

const CLOSE_INNER = (
  <>
    <span className="inline-flex items-center justify-center">
      <X className="size-4 shrink-0" />
    </span>
    <span className="sr-only">Close</span>
  </>
)

// Animated dialog for video / iframe content. `className` sets the panel size; `closeRef` is focused on open.
export function MediaDialog({ open, onClose, label, className = '', style, closeRef, children }) {
  useModal(open, onClose, closeRef)
  return createPortal(
    <>
      <Presence
        show={open}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      <Presence
        show={open}
        initial={HIDDEN}
        animate={SHOWN}
        exit={HIDDEN}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`fixed left-1/2 top-1/2 z-50 overflow-hidden rounded bg-background shadow-diffused ${className}`}
        style={style}
      >
        {children}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex cursor-pointer rounded-full bg-background p-2 lg:right-4 lg:top-4"
        >
          {CLOSE_INNER}
        </button>
      </Presence>
    </>,
    document.body,
  )
}

// Static (unanimated) centred card dialog. `panelClassName` sets the max width; `labelledBy` is the id of the title.
export function CardDialog({ onClose, labelledBy, panelClassName = '', children }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] rounded bg-background p-6 shadow-diffused md:p-8 ${panelClassName}`}
      >
        {children}
        <div className="absolute right-4 top-4 md:right-6 md:top-6">
          <button
            type="button"
            onClick={onClose}
            className="flex cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100"
          >
            {CLOSE_INNER}
          </button>
        </div>
      </div>
    </div>
  )
}
