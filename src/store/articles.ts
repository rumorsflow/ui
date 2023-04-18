import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Article } from '@/api'

export type ArticlesState = {
  articles: Article[]
  add: (articles: Article[]) => void
  clear: () => void
}

export const useArticles = create<ArticlesState>()(
  devtools((set, get) => ({
    articles: [],
    add: (articles: Article[]) => set(() => ({ articles: [...articles.reverse(), ...get().articles] })),
    clear: () => set(() => ({ articles: [] })),
  }))
)
