import { MotionValue } from 'framer-motion'

const maxHeight = () =>
  Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  ) - window.innerHeight

export const isFooterVisible = (scrollY: MotionValue<number>, after: number) => {
  const current = scrollY.get()
  const prev = scrollY.getPrevious()

  return maxHeight() - current > after && current < prev
}
