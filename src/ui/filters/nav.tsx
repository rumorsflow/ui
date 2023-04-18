import React, { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { useSites } from '@/store'
import { Site } from '@/api'

import { NavItem } from './nav-item'

const languages: Record<string, string> = {
  en: 'English',
  it: 'Italiano',
  ro: 'Română',
  ru: 'Русский',
}

const toParams = (key: string, data: string[]) => data.reduce((acc: string[][], cur) => [...acc, [key, cur]], [])

const useData = () => {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const sites = useSites((state) => Object.values(state.sites))

  return useMemo(() => {
    const domains = params.getAll('site')
    const langs = params.getAll('lang')

    const uniqueLangs = [
      ...new Set(
        (domains.length ? sites.filter((s) => domains.includes(s.domain)) : sites).reduce(
          (acc: string[], cur: Site) => [...acc, ...cur.languages],
          []
        )
      ),
    ]

    const langData = Object.keys(languages)
      .filter((l) => uniqueLangs.includes(l))
      .map((l) => {
        const active = langs.includes(l)
        const e = langs.filter((lang) => lang !== l)
        const q = new URLSearchParams([...toParams('site', domains), ...toParams('lang', active ? e : [l, ...e])])

        return { to: `${pathname}?${q.toString()}`, label: languages[l], active }
      })

    const siteData = (langs.length ? sites.filter((s) => s.languages.some((l) => langs.includes(l))) : sites).map(
      (site) => {
        const active = domains.includes(site.domain)
        const e = domains.filter((d) => d !== site.domain)
        const q = new URLSearchParams([
          ...toParams('site', active ? e : [site.domain, ...e]),
          ...toParams('lang', langs),
        ])

        return { to: `${pathname}?${q.toString()}`, label: site.domain, active }
      }
    )

    return [langData, siteData]
  }, [pathname, params, sites])
}

export const Nav: React.FC = () => {
  const [langs, sites] = useData()

  return (
    <nav className="filters">
      <ul>
        <li>
          <h5 className="filters__link">Languages</h5>
          <NavItem data={langs} />
        </li>
        <li>
          <h5 className="filters__link">Sites</h5>
          <NavItem data={sites} />
        </li>
      </ul>
    </nav>
  )
}
