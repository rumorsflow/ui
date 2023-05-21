import React, { forwardRef } from 'react'
import { OnEnter, useInView } from 'react-cool-inview'
import { IconPhoto } from '@tabler/icons-react'

import { Article } from '@/api'
import { useMergedRef } from '@/hooks'
import { Image } from '@/ui'

import { Share } from './share'
import { Caption } from './caption'
import { Content } from './content'

type RumorProps = {
  article: Article
  onEnter?: OnEnter
}

export const Rumor = forwardRef(({ article, onEnter }: RumorProps, ref: React.ForwardedRef<HTMLElement>) => {
  const { observe } = useInView({
    rootMargin: '50px 0px',
    onEnter,
  })

  const mergedRef = useMergedRef(observe, ref)

  return (
    <article ref={mergedRef} className={!article.image ? 'rumor rumor_no-image' : 'rumor'}>
      {article.image && (
        <Image src={article.image} className="rumor__image" thumb={<IconPhoto size={80} stroke={1.5} />} alt="" />
      )}
      <Share title={article.title} link={article.link} />
      <Caption siteId={article.site_id} time={article.pub_date} />
      <Content title={article.title} link={article.link} desc={article.short_desc} />
    </article>
  )
})
