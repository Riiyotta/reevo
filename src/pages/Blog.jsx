import { useSearchParams } from 'react-router-dom'
import { Container, GRID } from '../components/ui.jsx'
import PostCard from '../components/blog/PostCard.jsx'
import { CATEGORIES, POSTS, formatDateLocal } from '../data/blog.js'

function FilterButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`touch flex cursor-pointer items-center gap-3 transition-colors duration-200 ${
        active ? 'text-strong hover:text-strong' : 'text-gray-6 hover:text-gray-8'
      }`}
    >
      <div
        className={`flex h-[15px] w-[15px] items-center justify-center transition-colors duration-200 ${
          active ? 'bg-strong' : 'bg-gray-2'
        }`}
      >
        {active && <div className="size-[5px] bg-white" />}
      </div>
      <p className="block font-mono text-display-xs uppercase !text-current">{label}</p>
    </button>
  )
}

export default function Blog() {
  const [params, setParams] = useSearchParams()
  const current = (params.get('category') || '').toLowerCase()
  const posts = current ? POSTS.filter((p) => p.category.toLowerCase() === current) : POSTS

  const select = (label) => {
    const next = new URLSearchParams(params)
    if (label === 'All') next.delete('category')
    else next.set('category', label.toLowerCase())
    setParams(next, { preventScrollReset: true })
  }

  return (
    <main>
      <header className="py-10 md:py-12 xl:py-14">
        <Container>
          <div className={GRID}>
            <div className="col-span-6 md:col-span-12 lg:col-span-22 xl:col-span-20 xl:col-start-2">
              <h1 className="mb-5 block font-mono text-display-xs uppercase text-strong sm:mb-6 lg:mb-8">Blog</h1>
              <h2 className="block text-balance font-heading text-display-3xl font-black uppercase text-strong">
                Insights &amp; news
              </h2>
            </div>
          </div>
        </Container>
      </header>
      <section>
        <Container>
          <div className="max-sm:hidden">
            <div className={GRID}>
              <div className="col-span-6 md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
                <div className="mb-8 flex items-center gap-6 border-b border-border pb-8 md:gap-8">
                  {CATEGORIES.map((c) => (
                    <FilterButton
                      key={c}
                      label={c}
                      active={c === 'All' ? !current : c.toLowerCase() === current}
                      onClick={() => select(c)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} dateText={formatDateLocal(post.date)} />
          ))}
        </Container>
      </section>
    </main>
  )
}
