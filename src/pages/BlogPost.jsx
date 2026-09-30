import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button, Container, GRID } from '../components/ui.jsx'
import Prose from '../components/blog/Prose.jsx'
import PostCard, { CategoryTag } from '../components/blog/PostCard.jsx'
import PlaceholderBody, { PLACEHOLDER_H2, PLACEHOLDER_TAKEAWAYS, slugify } from '../components/blog/PlaceholderBody.jsx'
import { AuthorMeta, KeyTakeaways, NewsletterBox, TableOfContents } from '../components/blog/PostAside.jsx'
import { POSTS, formatDateUTC, getPost } from '../data/blog.js'
import { nb } from '../components/text.js'

const HEADINGS = PLACEHOLDER_H2.map((text) => ({ id: slugify(text), text }))

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug) || POSTS[0]
  const dateText = formatDateUTC(post.date)
  const related = post.related.map(getPost).filter(Boolean)

  return (
    <main>
      <article>
        <div className="py-10 md:py-12 lg:pb-12 lg:pt-20 xl:pb-14 xl:pt-[88px]">
          <Container>
            <div className={`${GRID} max-lg:mx-auto max-lg:max-w-[800px]`}>
              <div className="col-span-6 md:col-span-12 lg:col-span-14 lg:col-start-10 xl:col-span-13 xl:col-start-10">
                <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
                  <div>
                    <CategoryTag className="mb-3 lg:mb-4">{post.category}</CategoryTag>
                    <h1 className="text-3xl font-bold text-strong">{post.title}</h1>
                    <p className="mt-3 text-lg">{nb(post.excerpt)}</p>
                    <AuthorMeta post={post} dateText={dateText} className="mt-5 sm:mt-6 lg:hidden" />
                  </div>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      alt={post.title}
                      src={post.cover}
                      width="1760"
                      height="1760"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ color: 'transparent' }}
                    />
                  </div>
                  <Prose>
                    <PlaceholderBody figure={post.cover} />
                  </Prose>
                  <div className="flex flex-col gap-4 rounded bg-blue-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
                    <p className="block text-balance text-display-xl font-bold text-strong">A force multiplier for sales teams.</p>
                    <Button href="/get-started" variant="primary" icon={ChevronRight}>
                      Get started
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-6 max-lg:hidden md:col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1 xl:col-span-7 xl:col-start-2">
                <div className="sticky top-28 xl:top-32 [&>*:not(:last-child)]:mb-8 xl:[&>*:not(:last-child)]:mb-10">
                  <Link
                    to="/blog"
                    className="touch relative -ml-1.5 inline-flex shrink-0 cursor-pointer items-center justify-between gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-all duration-200"
                  >
                    <div className="inline-flex items-center justify-center">
                      <ChevronLeft className="size-4 flex-shrink-0" />
                    </div>
                    Back to blog
                  </Link>
                  <AuthorMeta post={post} dateText={dateText} />
                  <KeyTakeaways items={PLACEHOLDER_TAKEAWAYS.slice(0, post.takeaways)} />
                  <TableOfContents headings={HEADINGS} maxHeight={post.takeaways ? 188 : 252} />
                  <NewsletterBox />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </article>
      {related.length > 0 && (
        <section className="md:pt-4 lg:pt-8 xl:pt-10">
          <Container>
            <div className={GRID}>
              <div className="col-span-6 mb-8 border-b border-border md:col-span-12 lg:col-span-24 xl:col-span-22 xl:col-start-2">
                <div className="mb-6 flex items-center justify-between lg:mb-8">
                  <p className="block text-display-lg font-bold text-strong">You might also like</p>
                  <Link
                    to="/blog"
                    className="touch relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 whitespace-nowrap border-b border-current text-xs font-medium text-primary transition-all duration-200"
                  >
                    View all
                  </Link>
                </div>
              </div>
            </div>
            <div>
              {related.map((p) => (
                <PostCard key={p.slug} post={p} dateText={formatDateUTC(p.date)} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
