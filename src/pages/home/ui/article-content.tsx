import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Article } from '@/api'

import { useSite } from '../hooks'

const variants = {
  rest: { height: 0, ease: 'easeOut', duration: 0.1 },
  hover: { height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } },
}

type ArticleContentProps = {
  article: Article
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const [to, domain] = useSite(article.site_id)

  return (
    <>
      <div className="article__caption">
        {domain && (
          <Link to={to} className="article__site">
            {domain}
          </Link>
        )}
        <time className="article__time">{article.pub_diff}</time>
      </div>
      <h2 className="article__title">
        <a href={article.link} target="_blank" rel="noreferrer">
          {article.title}
        </a>
      </h2>
      {article.short_desc && (
        <motion.p className="article__desc" variants={variants}>
          <a href={article.link} target="_blank" rel="noreferrer">
            {article.short_desc}
          </a>
        </motion.p>
      )}
    </>
  )
}
