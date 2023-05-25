import React from 'react'
import { IconPhoto } from '@tabler/icons-react'

import { Article } from '@/api'
import { Image } from '@/ui'

import { Share } from './share'
import { Caption } from './caption'
import { Content } from './content'

type Rumor1Props = {
  article: Article
}

export const Rumor1: React.FC<Rumor1Props> = ({ article }) => {
  if (!article.image) {
    return <></>
  }

  return (
    <article className="rumor-1">
      <Image className="rumor-1__image" src={article.image} alt="" thumb={<IconPhoto size={80} stroke={1.5} />} />
      <div className="rumor-1__info">
        <Share title={article.title} link={article.link} />
        <Caption siteId={article.site_id} time={article.pub_date} />
        <Content title={article.title} link={article.link} desc={article.desc} />
      </div>
    </article>
  )
}
