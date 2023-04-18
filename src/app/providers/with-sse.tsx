import React from 'react'

import { API_URL, APP_NO_SSE } from '@/config'
import { Article } from '@/api'
import { useArticles } from '@/store'
import { useSse, useSseListener } from '@/hooks'

export const withSse = (component: () => React.ReactNode) => () => {
  if (APP_NO_SSE) {
    return <>{component()}</>
  }

  const add = useArticles((state) => state.add)
  const [sse] = useSse(`${API_URL}/realtime`, true)

  useSseListener(sse, ['articles'], (evt) => add(JSON.parse(evt.data) as Article[]))

  return <>{component()}</>
}
