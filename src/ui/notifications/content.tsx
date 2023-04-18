import React from 'react'
import { IconPhoto } from '@tabler/icons-react'

import { useSites } from '@/store'
import { Image } from '@/ui'
import { Article } from '@/api'
import { fromNow } from '@/lib'

type ArticleContentProps = {
  article: Article
  className: string
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article, className }) => {
  const sites = useSites((state) => state.sites)

  return (
    <span className={`text-sm flex flex-col gap-1 ${className}`}>
      <span className="flex justify-between items-center">
        <span className="article__site hover:no-underline">{sites[article.site_id].domain}</span>
        <time className="article__time">{fromNow(article.pub_date)}</time>
      </span>
      <a
        href={article.link}
        className="line-clamp-2 overflow-hidden hover:underline hover:underline-offset-4"
        target="_blank"
        rel="noreferrer"
      >
        {article.title}
      </a>
    </span>
  )
}

type ContentProps = {
  articles: Article[]
}

export const Content: React.FC<ContentProps> = ({ articles }) => (
  <div className="notifications__content">
    {articles.map((item) => (
      <React.Fragment key={item.id}>
        {item.image ? (
          <div className="w-full grid grid-cols-7 gap-2">
            <Image
              src={item.image}
              alt=""
              className="w-full col-span-2 h-[4rem]"
              thumb={<IconPhoto size={20} stroke={1.5} />}
            />
            <ArticleContent article={item} className="col-span-5" />
          </div>
        ) : (
          <div className="flex gap-2 w-full p-2 shadow-md bg-white dark:bg-dark-600">
            <ArticleContent article={item} className="grow" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)
