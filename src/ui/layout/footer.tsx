import React, { useMemo, useState } from 'react'
import { motion, MotionValue, useMotionValueEvent, useScroll } from 'framer-motion'
import { IconBrandTelegram, IconMoonStars, IconSun } from '@tabler/icons-react'

import { APP_NAME_LONG, APP_TELEGRAM_URL } from '@/config'
import { useTheme } from '@/hooks'

import { isFooterVisible } from './is-footer-visible'

const variants = {
  visible: { opacity: 1, transform: 'translateY(0%)', height: 'auto' },
  hidden: { opacity: 0, transform: 'translateY(100%)', height: 0 },
}

const getYear = () => ((y: number) => (y < 2023 ? 2023 : y))(new Date().getUTCFullYear())

const isFooterHidden = (scrollY: MotionValue<number>, after: number) => {
  const current = scrollY.get()
  const prev = scrollY.getPrevious()

  return current > after && current > prev
}

const useFooterVisibility = (after: number) => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', () => {
    if (isFooterVisible(scrollY, after)) {
      setHidden(false)
    } else if (isFooterHidden(scrollY, after)) {
      setHidden(true)
    }
  })

  return hidden
}

export const Footer: React.FC = () => {
  const y = useMemo(() => getYear(), [])
  const { toggleMode } = useTheme()
  const hidden = useFooterVisibility(65)

  return (
    <motion.footer
      layout="position"
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.2 }}
      className="footer"
    >
      <div className="footer__container">
        <div className="footer__copy">
          <span>
            © {y} {APP_NAME_LONG}.
          </span>
          <span>All Rights Reserved.</span>
        </div>
        <div className="footer__menu">
          <button type="button" onClick={toggleMode}>
            <span className="sr-only">Theme</span>
            <IconSun className="dark:hidden" size={20} stroke={1.5} />
            <IconMoonStars className="hidden dark:block" size={20} stroke={1.5} />
          </button>
          <a href={APP_TELEGRAM_URL} target="_blank" rel="noreferrer">
            <span className="sr-only">{APP_NAME_LONG} on Telegram</span>
            <IconBrandTelegram size={20} stroke={1.5} />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
