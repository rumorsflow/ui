import React from 'react'
import { defer, LoaderFunctionArgs } from 'react-router-dom'
import { IconMoodSad } from '@tabler/icons-react'

import { APP_PER_PAGE } from '@/config'
import { Article, fetchArticles, FetchResponse, fetchSites, Page, Site } from '@/api'
import { useSites } from '@/store'
import { Awaiter, RouteErrorPage } from '@/ui'

import { FirstArticle, GridArticle } from './ui'
import { useHomeValue } from './hooks'

const emptyResponse = <T = unknown,>(): FetchResponse<Page<T>> => ({ data: { total: 0, index: 0, size: 0 } })

const throwIfError = <T = unknown,>(response: FetchResponse<T>) => {
  if (!response.error) {
    return
  }

  throw new Response('', {
    status: typeof response.error.status === 'number' ? response.error.status : 500,
    statusText: (response.error as { error: string }).error ?? 'Unknown error',
  })
}

export function loader({ request }: LoaderFunctionArgs) {
  const [, query] = request.url.split('?', 2)
  const params = new URLSearchParams(query)

  const sitesState = useSites.getState()

  const sites = Object.keys(sitesState.sites).length
    ? Promise.resolve(emptyResponse<Site>())
    : fetchSites(0, 100, request.signal).then((response) => {
        if (response.data?.data?.length) {
          sitesState.set(
            response.data.data.reduce(
              (acc, cur) => ({
                ...acc,
                [cur.id]: cur,
              }),
              {} as Record<string, Site>
            )
          )
        }

        return response
      })

  const articles = fetchArticles(
    {
      size: APP_PER_PAGE + 1,
      sites: params.getAll('site'),
      langs: params.getAll('lang'),
    },
    request.signal
  )

  return defer({
    data: Promise.all([sites, articles]).then((data: [FetchResponse<Page<Site>>, FetchResponse<Page<Article>>]) => {
      throwIfError(data[0])
      throwIfError(data[1])

      const index = data[1].data?.data?.findIndex((item) => !!item.image) ?? -1

      return {
        error: undefined,
        meta: data[1].meta,
        data: [
          data[1].data?.data?.at(0)?.pub_date,
          index === -1 ? undefined : data[1].data?.data?.splice(index, 1)?.at(0),
          data[1].data!, // eslint-disable-line
        ],
      }
    }),
  })
}

function ArticleList() {
  const { article, pages, onEnter } = useHomeValue()

  return (
    <>
      {article && <FirstArticle article={article} />}
      {pages.length > 0 && pages[0].total > 0 && (
        <div className="article-list">
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data?.map((item) => (
                <GridArticle
                  key={item.id}
                  onEnter={pages.at(-1)?.data?.at(-1) === item ? onEnter : undefined}
                  article={item}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
      {!article && (pages.length === 0 || pages[0].total === 0) && (
        <div className="empty-article-list">
          <IconMoodSad size={150} stroke={1.5} />
          <span className="text-xl font-bold">No news found.</span>
        </div>
      )}
    </>
  )
}

export function Component() {
  return (
    <Awaiter>
      <ArticleList />
    </Awaiter>
  )
}

Component.displayName = 'HomePage'

export function ErrorBoundary() {
  return <RouteErrorPage />
}

ErrorBoundary.displayName = 'HomePageError'
