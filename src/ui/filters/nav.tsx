import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { IconLanguage, IconMoodSad, IconWorldSearch, IconWorldX } from '@tabler/icons-react'

import { useToggle } from '@/hooks'
import { useSites } from '@/store'
import { Site } from '@/api'

import { Item, NavItem } from './nav-item'

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

    const langData: Item[] = Object.keys(languages)
      .filter((l) => uniqueLangs.includes(l))
      .map((l) => {
        const active = langs.includes(l)
        const e = langs.filter((lang) => lang !== l)
        const q = new URLSearchParams([...toParams('site', domains), ...toParams('lang', active ? e : [l, ...e])])

        return { to: `${pathname}?${q.toString()}`, label: languages[l], active }
      })

    const siteData: Item[] = (
      langs.length ? sites.filter((s) => s.languages.some((l) => langs.includes(l))) : sites
    ).map((site) => {
      const active = domains.includes(site.domain)
      const e = domains.filter((d) => d !== site.domain)
      const q = new URLSearchParams([...toParams('site', active ? e : [site.domain, ...e]), ...toParams('lang', langs)])

      return { to: `${pathname}?${q.toString()}`, label: site.domain, active, img: site.favicon }
    })

    return [langData, siteData]
  }, [pathname, params, sites])
}

export const Nav: React.FC = () => {
  const [langs, sites] = useData()
  const ref = useRef<HTMLInputElement>(null)
  const [isFilter, toggle] = useToggle()
  const [filtered, setFiltered] = useState(sites)
  const [search, setSearch] = useState('')

  const onToggle = useCallback(() => {
    toggle((value) => {
      if (!ref.current) {
        return value
      }

      if (value) {
        ref.current.blur()
        ref.current.value = ''
        setSearch('')
      } else {
        ref.current.focus()
      }

      return !value
    })
  }, [toggle, setSearch])

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        setFiltered(search.length > 0 ? sites.filter((item) => item.label.startsWith(search.toLowerCase())) : sites),
      200
    )

    return () => clearTimeout(timeoutId)
  }, [search, sites])

  return (
    <nav className="filters">
      <ul>
        <li>
          <div className="filters__item">
            <IconLanguage size={22} />
            <h5 className="filters__title">Languages</h5>
          </div>
          <NavItem data={langs} />
        </li>
        <li>
          <div className="filters__item">
            <button type="button" onClick={onToggle} className="hover:text-dark-500 dark:hover:text-white">
              {isFilter ? <IconWorldX size={22} /> : <IconWorldSearch size={22} />}
            </button>
            <div className="flex grow">
              <input
                ref={ref}
                type="text"
                placeholder="Search..."
                className={isFilter ? 'w-auto grow filters__search' : 'w-0 filters__search'}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              {!isFilter && (
                <h5 className="filters__title cursor-pointer" onClick={onToggle}>
                  Sites
                </h5>
              )}
            </div>
          </div>
          {filtered.length > 0 ? (
            <NavItem data={filtered} />
          ) : (
            <div className="filters__empty">
              <IconMoodSad size={60} stroke={1.5} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
