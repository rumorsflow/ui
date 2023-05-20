import React from 'react'
import { IconPhoto } from '@tabler/icons-react'

import { Article } from '@/api'
import { Image } from '@/ui'

import { ArticleShare } from './article-share'
import { ArticleContent } from './article-content'

type FirstArticleProps = {
  article: Article
}

export const FirstArticle: React.FC<FirstArticleProps> = ({ article }) => {
  if (!article.image) {
    return <></>
  }

  return (
    <div className="first-article">
      <Image className="first-article__image" src={article.image} alt="" thumb={<IconPhoto size={80} stroke={1.5} />} />
      <div className="first-article__content">
        <div className="article-share">
          <ArticleShare article={article} />
        </div>
        <ArticleContent article={article} />
      </div>
    </div>
  )
}
