import { API_URL, APP_PER_PAGE } from '@/config'

import { Page, Site, Article } from './types'

const validateStatus = (response: Response) => response.status >= 200 && response.status <= 299

const handleResponse = async (response: Response) => {
  const text = await response.text()

  return text.length ? JSON.parse(text) : null
}

export type FetchArgs = RequestInit & {
  timeout?: number
  prepareHeaders?: (headers: Headers) => Promise<Headers | void>
}

export type FetchError =
  | {
      status: number
      data: unknown
    }
  | {
      status: 'FETCH_ERROR'
      data?: undefined
      error: string
    }
  | {
      status: 'PARSING_ERROR'
      originalStatus: number
      data: string
      error: string
    }
  | {
      status: 'TIMEOUT_ERROR'
      data?: undefined
      error: string
    }
  | {
      status: 'CUSTOM_ERROR'
      data?: unknown
      error: string
    }

export type FetchResponse<T = unknown, M = { response: Response; id?: string }> =
  | {
      error: FetchError
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }

export const fetchFn = async <T = unknown>(
  path: string,
  { timeout, signal, headers, prepareHeaders = (x) => Promise.resolve(x), ...args }: FetchArgs = {}
): Promise<FetchResponse<T>> => {
  const controller = new AbortController()
  const internalSignal = controller.signal

  const handler = () => {
    controller.abort(signal?.reason)
  }

  signal?.addEventListener('abort', handler)

  let response,
    timedOut = false

  const timeoutId =
    timeout &&
    setTimeout(() => {
      timedOut = true
      controller.abort('TIMEOUT_ERROR')
    }, timeout)

  headers = new Headers(headers)
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  headers = (await prepareHeaders(headers)) || headers

  try {
    response = await fetch(path.startsWith('/') ? `${API_URL}${path}` : path, {
      ...args,
      headers,
      signal: internalSignal,
    })
  } catch (e) {
    return {
      error: {
        status: timedOut ? 'TIMEOUT_ERROR' : 'FETCH_ERROR',
        error: String(e),
      },
    }
  } finally {
    signal?.removeEventListener('abort', handler)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  const responseClone = response.clone()
  const meta = { response: responseClone }

  let resultData: unknown
  let responseText = ''
  try {
    let handleResponseError
    await Promise.all([
      handleResponse(response).then(
        (r) => (resultData = r),
        (e) => (handleResponseError = e)
      ),
      // see https://github.com/node-fetch/node-fetch/issues/665#issuecomment-538995182
      responseClone.text().then(
        (r) => (responseText = r),
        () => {
          // ignore
        }
      ),
    ])
    if (handleResponseError) {
      throw handleResponseError
    }
  } catch (e) {
    return {
      error: {
        status: 'PARSING_ERROR',
        originalStatus: response.status,
        data: responseText,
        error: String(e),
      },
      meta,
    }
  }

  return validateStatus(response)
    ? {
        data: resultData as T,
        meta: {
          ...meta,
          id: response.status === 201 ? response.headers.get('location')?.split('/').pop() : undefined,
        },
      }
    : {
        error: {
          status: response.status,
          data: resultData,
        },
        meta,
      }
}

export const fetchSites = (index: number, size: number, signal?: AbortSignal) =>
  fetchFn<Page<Site>>(`/sites?index=${index}&size=${size}`, { method: 'GET', signal })

export type ArticlesRequest = {
  index?: number
  size?: number
  dt?: string
  sites?: string[]
  langs?: string[]
}

export const fetchArticles = (
  { index, size = APP_PER_PAGE, dt, sites, langs }: ArticlesRequest,
  signal?: AbortSignal
) => {
  const params = []

  if (index) {
    params.push(['index', index.toString()])
  }

  if (size) {
    params.push(['size', size.toString()])
  }

  if (dt) {
    params.push(['dt', dt])
  }

  if (sites?.length) {
    params.push(['sites', sites.join()])
  }

  if (langs?.length) {
    params.push(['langs', langs.join()])
  }

  return fetchFn<Page<Article>>(`/articles?${new URLSearchParams(params).toString()}`, { method: 'GET', signal })
}
