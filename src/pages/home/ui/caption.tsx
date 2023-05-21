import React from 'react'
import { Link } from 'react-router-dom'

import { fromNow } from '@/lib'

import { useSite } from '../hooks'

type CaptionProps = {
  siteId: string
  time: string
}

export const Caption: React.FC<CaptionProps> = ({ siteId, time }) => {
  const [to, domain] = useSite(siteId)

  return (
    <div className="caption">
      {domain && (
        <Link to={to} className="caption__site">
          {domain}
        </Link>
      )}
      <time className="caption__time">{fromNow(time)}</time>
    </div>
  )
}
