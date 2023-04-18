import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { Site } from '@/api'

export type SitesState = {
  sites: Record<string, Site>
  set: (sites: Record<string, Site>) => void
}

export const useSites = create<SitesState>()(
  devtools((set) => ({
    sites: {},
    set: (sites: Record<string, Site>) => set(() => ({ sites })),
  }))
)
