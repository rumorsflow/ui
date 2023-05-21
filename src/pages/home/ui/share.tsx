import React, { useCallback, useMemo } from 'react'
import { IconBrandFacebook, IconBrandTwitter, IconBrandWhatsapp, IconLink } from '@tabler/icons-react'

import { useTimeout, useToggle } from '@/hooks'
import { copyToClipboard } from '@/lib'

type ShareProps = {
  title: string
  link: string
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

export const Share: React.FC<ShareProps> = ({ title, link }) => {
  const fb = useMemo(() => buildURL(FB_LINK, ['u', link]), [link])
  const wa = useMemo(() => buildURL(WA_LINK, ['text', link]), [link])
  const tw = useMemo(() => buildURL(TW_LINK, ['text', title], ['url', link]), [title, link])

  const [copied, setCopied] = useToggle()

  const onCopy = useCallback(async () => {
    const c = await copyToClipboard(link)
    c && setCopied(true)
  }, [link, setCopied])

  const onTimeout = useCallback(() => setCopied(false), [setCopied])
  const delay = useMemo(() => (copied ? 1000 : null), [copied])

  useTimeout(onTimeout, delay)

  return (
    <div className="share">
      <a href={fb} className="share__link share__link_fb" target="_blank" rel="noreferrer">
        <IconBrandFacebook size={25} />
      </a>
      <a href={wa} className="share__link share__link_wa" target="_blank" rel="noreferrer">
        <IconBrandWhatsapp size={25} />
      </a>
      <a href={tw} className="share__link share__link_tw" target="_blank" rel="noreferrer">
        <IconBrandTwitter size={25} />
      </a>
      {!!navigator?.clipboard && (
        <button onClick={onCopy} disabled={copied} className="share__link share__link_copy">
          <IconLink size={25} />
        </button>
      )}
    </div>
  )
}
