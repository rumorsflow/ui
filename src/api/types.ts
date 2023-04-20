export type Page<T = unknown> = {
  data?: T[]
  total: number
  index: number
  size: number
}

export type Site = {
  id: string
  domain: string
  favicon: string
  title: string
  languages: string[]
}

export type Article = {
  id: string
  site_id: string
  lang: string
  title: string
  short_desc?: string
  link: string
  image?: string
  pub_date: string
  pub_diff: string
  categories?: string[]
}
