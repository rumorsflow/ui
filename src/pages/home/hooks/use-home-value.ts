import { useCallback, useEffect, useRef, useState } from 'react'
import { useAsyncValue, useSearchParams } from 'react-router-dom'

import { APP_PER_PAGE } from '@/config'
import { scroll } from '@/lib'
import { Article, fetchArticles, Page } from '@/api'

export const useHomeValue = () => {
  const controller = useRef<AbortController | null>(null)
  const [params] = useSearchParams()
  const [pages, setPages] = useState<Page<Article>[]>([])

  const {
    data: [dt, article, page],
  } = useAsyncValue() as { data: [string | undefined, Article | undefined, Page<Article>] }

  useEffect(() => {
    return () => {
      controller.current?.abort()
      controller.current = null
    }
  }, [])

  useEffect(() => {
    scroll({ y: 0 }, 'auto')
    setPages([page])
  }, [page])

  const onEnter = useCallback(async () => {
    controller.current?.abort()
    controller.current = new AbortController()

    const response = await fetchArticles(
      {
        index: pages.length * APP_PER_PAGE + 1,
        size: APP_PER_PAGE,
        sites: params.getAll('site'),
        langs: params.getAll('lang'),
        dt,
      },
      controller.current.signal
    )

    if (response.data?.data?.length) {
      setPages((prev) => [...prev, response.data])
    }
  }, [dt, pages, params])

  return { article, pages, onEnter }
}
