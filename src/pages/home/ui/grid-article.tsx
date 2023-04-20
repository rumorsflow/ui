import React, { forwardRef, useMemo } from 'react'
import { OnEnter, useInView } from 'react-cool-inview'
import { motion } from 'framer-motion'
import { IconPhoto } from '@tabler/icons-react'

import { Article } from '@/api'
import { useMergedRef } from '@/hooks'
import { Image } from '@/ui'

import { ArticleShare } from './article-share'
import { ArticleContent } from './article-content'

type ArticleProps = {
  article: Article
  onEnter?: OnEnter
}

const variants = {
  rest: { opacity: 0, height: 0, ease: 'easeOut', duration: 0.1 },
  hover: { opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } },
}

export const GridArticle = forwardRef(({ article, onEnter }: ArticleProps, ref: React.ForwardedRef<HTMLElement>) => {
  const isMobile = useMemo(() => window.matchMedia('(hover: none)').matches, [])

  const { observe } = useInView({
    rootMargin: '50px 0px',
    onEnter,
  })

  const mergedRef = useMergedRef(observe, ref)

  return (
    <React.Fragment>
      {article.image ? (
        <motion.article
          ref={mergedRef}
          className="article"
          initial={isMobile ? 'hover' : 'rest'}
          whileHover="hover"
          animate={isMobile ? 'hover' : 'rest'}
        >
          <Image src={article.image} alt="" className="article__image" thumb={<IconPhoto size={80} stroke={1.5} />} />
          <motion.div className="article-share" variants={variants}>
            <div className="article-share__wrapper">
              <ArticleShare article={article} />
            </div>
          </motion.div>
          <div className="article__container">
            <div className="article__wrapper">
              <ArticleContent article={article} />
            </div>
          </div>
        </motion.article>
      ) : (
        <article ref={mergedRef} className="article article_no-image">
          <div className="article-share">
            <ArticleShare article={article} />
          </div>
          <ArticleContent article={article} />
        </article>
      )}
    </React.Fragment>
  )
})
