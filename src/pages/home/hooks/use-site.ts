import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { useSites } from '@/store'

export const useSite = (id: string) => {
  const { pathname } = useLocation()
  const site = useSites((state) => state.sites[id])

  const to = useMemo(() => {
    if (!site?.domain || !site?.languages) {
      return pathname
    }

    const query = new URLSearchParams([
      ['site', site.domain],
      ...site.languages.reduce((acc, cur) => [...acc, ['lang', cur]], [] as string[][]),
    ])

    return `${pathname}?${query.toString()}`
  }, [pathname, site?.domain, site?.languages])

  return [to, site?.domain]
}
