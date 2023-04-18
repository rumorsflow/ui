import { useEffect } from 'react'

export const useWindowEvent = <K extends keyof WindowEventMap | string>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    window.addEventListener(type, listener, options)

    return () => window.removeEventListener(type, listener, options)
  }, [type, listener, options])
}
