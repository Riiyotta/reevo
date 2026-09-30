import { Link } from 'react-router-dom'
import { GRID } from '../ui.jsx'
import { AUTHORS } from '../../data/blog.js'
import { nb } from '../text.js'

// Category tag: mono 12 uppercase, 25px tall bordered chip.
export function CategoryTag({ className = '', children }) {
  return (
    <span
      className={`inline-flex h-[25px] items-center justify-center rounded border border-border px-2 font-mono text-display-xs uppercase text-strong ${className}`}
    >
      {children}
    </span>
  )
}

function AuthorAvatar({ name, className = 'size-6' }) {
  return (
    <div className={`relative aspect-square flex-shrink-0 overflow-hidden ${className}`}>
      <img
        alt={`${name} photo`}
        src={AUTHORS[name]}
        width="48"
        height="48"
        loading="lazy"
        decoding="async"
        className="absolute left-0 top-0 h-full w-full object-cover"
        style={{ color: 'transparent' }}
      />
    </div>
  )
}

// Blog list row (index + "You might also like"). `featured` = first row of the index.
export default function PostCard({ post, featured = false, dateText }) {
  return (
    <div className="group relative">
      <div className={`${GRID} gap-y-6`}>
        <div
          className={
            featured
              ? 'col-span-6 md:col-span-5 lg:col-span-8 xl:col-span-6 xl:col-start-2'
              : 'col-span-6 md:col-span-4 lg:col-span-6 xl:col-span-4 xl:col-start-2'
          }
        >
          <div className="relative aspect-square">
            <img
              alt={post.title}
              src={post.cover}
              width={featured ? 1400 : 900}
              height={featured ? 1400 : 900}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
              style={{ color: 'transparent' }}
            />
          </div>
        </div>
        <div
          className={
            featured
              ? 'col-span-6 md:col-span-7 lg:col-span-16 xl:col-span-16'
              : 'col-span-6 md:col-span-8 lg:col-span-18 xl:col-span-18'
          }
        >
          <div className="flex flex-col md:h-full md:justify-between md:pl-4">
            <div>
              <CategoryTag className="mb-2">{post.category}</CategoryTag>
              <p className={`mb-3 text-pretty font-bold text-strong md:mb-4 ${featured ? 'text-2xl' : 'text-xl'}`}>
                <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:z-10 after:content-['']">
                  {post.title}
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-5 md:pb-6 lg:flex-row lg:items-end">
              <p className="text-pretty lg:flex-1 lg:pr-10">{nb(post.excerpt)}</p>
              <div className="flex shrink-0 items-center gap-2">
                <p className="block font-mono text-display-xs uppercase text-foreground">{dateText}</p>
                <AuthorAvatar name={post.author} />
              </div>
            </div>
          </div>
        </div>
        <div role="presentation" aria-hidden="true" className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
          <div className="pb-8 pt-2">
            <div className="h-px w-full bg-border" />
          </div>
        </div>
      </div>
    </div>
  )
}
