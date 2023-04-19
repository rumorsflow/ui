export type ScrollPosition = {
  x: number
  y: number
}

export const scroll = ({ x, y }: Partial<ScrollPosition>, behavior: ScrollBehavior = 'smooth') => {
  if (typeof window !== 'undefined') {
    const scrollOptions: ScrollToOptions = { behavior }

    if (typeof x === 'number') {
      scrollOptions.left = x
    }

    if (typeof y === 'number') {
      scrollOptions.top = y
    }

    window.scrollTo(scrollOptions)
  }
}
