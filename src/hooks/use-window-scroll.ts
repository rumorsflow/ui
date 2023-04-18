import { useState, useEffect } from 'react'

import { useWindowEvent } from '.'

type ScrollPosition = {
  x: number
  y: number
}

function getScrollPosition(): ScrollPosition {
  return typeof window !== 'undefined' ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 }
}

function scrollTo({ x, y }: Partial<ScrollPosition>, behavior: ScrollBehavior = 'smooth') {
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

export const useWindowScroll = () => {
  const [position, setPosition] = useState<ScrollPosition>({ x: 0, y: 0 })

  useWindowEvent('scroll', () => setPosition(getScrollPosition()))
  useWindowEvent('resize', () => setPosition(getScrollPosition()))

  useEffect(() => {
    setPosition(getScrollPosition())
  }, [])

  return [position, scrollTo] as const
}
