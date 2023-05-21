import React from 'react'
import { IconPhoto } from '@tabler/icons-react'

import { useSites } from '@/store'
import { Image } from '@/ui'
import { Article } from '@/api'
import { fromNow } from '@/lib'

type RumorContentProps = {
  article: Article
  className: string
}

const RumorContent: React.FC<RumorContentProps> = ({ article, className }) => {
  const sites = useSites((state) => state.sites)

  return (
    <div className={`text-sm flex flex-col gap-1 ${className}`}>
      <div className="caption">
        <span className="caption__site">{sites[article.site_id].domain}</span>
        <time className="caption__time">{fromNow(article.pub_date)}</time>
      </div>
      <a href={article.link} className="line-clamp-2 overflow-hidden" target="_blank" rel="noreferrer">
        {article.title}
      </a>
    </div>
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
            <RumorContent article={item} className="col-span-5" />
          </div>
        ) : (
          <div className="flex gap-2 w-full p-2 shadow-md bg-white dark:bg-dark-600">
            <RumorContent article={item} className="grow" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
)
