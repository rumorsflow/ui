import React, { useCallback, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { IconArrowUp } from '@tabler/icons-react'

import { scroll } from '@/lib'

import { isFooterVisible } from './is-footer-visible'

const variants = {
  visible: { opacity: 1, height: 'auto', bottom: '1rem' },
  withFooter: { opacity: 1, height: 'auto', bottom: '3.5625rem' },
  hidden: { opacity: 0, height: 0, bottom: '1rem' },
}

export const Affix: React.FC = () => {
  const { scrollY } = useScroll()
  const [animate, setAnimate] = useState<'visible' | 'withFooter' | 'hidden'>('hidden')

  const onUp = useCallback(() => setTimeout(() => scroll({ y: 0 }, 'auto'), 0), [])

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (current > 65) {
      setAnimate(isFooterVisible(scrollY, 65) ? 'withFooter' : 'visible')
    } else {
      setAnimate('hidden')
    }
  })

  return (
    <motion.div
      layout="position"
      variants={variants}
      animate={animate}
      transition={{ duration: 0.2 }}
      className="affix"
    >
      <button className="affix__btn" onClick={onUp}>
        <IconArrowUp size={20} stroke={1.5} />
      </button>
    </motion.div>
  )
}
