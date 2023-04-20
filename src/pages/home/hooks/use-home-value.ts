import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAsyncValue, useSearchParams } from 'react-router-dom'
import { Event } from 'react-cool-inview'

import { APP_PER_PAGE } from '@/config'
import { scroll } from '@/lib'
import { Article, fetchArticles, Page } from '@/api'

export const useHomeValue = <T extends HTMLElement | null>() => {
  const controller = useMemo(() => new AbortController(), [])
  const [params] = useSearchParams()
  const [pages, setPages] = useState<Page<Article>[]>([])

  const {
    data: [dt, article, page],
  } = useAsyncValue() as { data: [string | undefined, Article | undefined, Page<Article>] }

  const onEnter = useCallback(
    async ({ unobserve }: Event<T>) => {
      unobserve()

      const response = await fetchArticles(
        {
          index: pages.length * APP_PER_PAGE + 1,
          size: APP_PER_PAGE,
          sites: params.getAll('site'),
          langs: params.getAll('lang'),
          dt,
        },
        controller.signal
      )

      if (response.data?.data?.length) {
        setPages((prev) => [...prev, response.data])
      }
    },
    [dt, pages, controller, params, page] // eslint-disable-line
  )

  useEffect(() => {
    return () => controller.abort()
  }, [controller])

  useEffect(() => {
    scroll({ y: 0 }, 'auto')
    setPages([page])
  }, [page])

  return { article, pages, onEnter }
}
