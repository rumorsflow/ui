import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

type OverlayProps = {
  motionKey: string
  show: boolean
}

export const Overlay: React.FC<OverlayProps> = ({ show, motionKey }) => {
  useEffect(() => {
    if (show) {
      if (!document.body.classList.contains('overflow-hidden')) {
        document.body.classList.add('overflow-hidden')
      }
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  return createPortal(
    <div>
      <AnimatePresence>
        {show && (
          <motion.div
            key={motionKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overlay"
          />
        )}
      </AnimatePresence>
    </div>,
    document.body
  )
}
