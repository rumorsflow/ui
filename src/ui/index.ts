export * from './theme'
export * from './error'
export * from './loader'
export * from './layout'
export * from './awaiter'
export * from './popover'
export * from './image'
export * from './overlay'
export * from './drawer'
export * from './notifications'
export * from './filters'

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
