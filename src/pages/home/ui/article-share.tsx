import React, { useCallback, useMemo } from 'react'
import { IconBrandFacebook, IconBrandTwitter, IconBrandWhatsapp, IconLink } from '@tabler/icons-react'

import { Article } from '@/api'
import { copyToClipboard } from '@/lib'
import { useTimeout, useToggle } from '@/hooks'

type ArticleShareProps = {
  article: Article
}

const FB_LINK = 'https://www.facebook.com/sharer/sharer.php'
const WA_LINK = 'https://wa.me/'
const TW_LINK = 'https://twitter.com/intent/tweet'

const buildURL = (link: string, ...params: string[][]) => {
  const url = new URL(link)

  for (const [key, value] of params) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export const ArticleShare: React.FC<ArticleShareProps> = ({ article }) => {
  const fb = useMemo(() => buildURL(FB_LINK, ['u', article.link]), [article.link])
  const wa = useMemo(() => buildURL(WA_LINK, ['text', article.link]), [article.link])
  const tw = useMemo(
    () => buildURL(TW_LINK, ['text', article.title], ['url', article.link]),
    [article.title, article.link]
  )

  const [copied, setCopied] = useToggle()

  const onCopy = useCallback(async () => {
    const c = await copyToClipboard(article.link)
    c && setCopied(true)
  }, [article.link, setCopied])

  const onTimeout = useCallback(() => setCopied(false), [setCopied])
  const delay = useMemo(() => (copied ? 1000 : null), [copied])

  useTimeout(onTimeout, delay)

  return (
    <>
      <a href={fb} className="article-share__link article-share__link_fb" target="_blank" rel="noreferrer">
        <IconBrandFacebook size={25} />
      </a>
      <a href={wa} className="article-share__link article-share__link_wa" target="_blank" rel="noreferrer">
        <IconBrandWhatsapp size={25} />
      </a>
      <a href={tw} className="article-share__link article-share__link_tw" target="_blank" rel="noreferrer">
        <IconBrandTwitter size={25} />
      </a>
      {!!navigator?.clipboard && (
        <button onClick={onCopy} className={`article-share__link ${copied ? 'article-share__link_copied' : ''}`}>
          <IconLink size={25} />
        </button>
      )}
    </>
  )
}
