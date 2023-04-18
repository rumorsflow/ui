import React, { forwardRef, useCallback, useState } from 'react'
import { motion, MotionStyle } from 'framer-motion'
import { createPortal } from 'react-dom'

type DropdownProps = {
  children: React.ReactNode
  show: boolean
  style: MotionStyle
  className: string
  containerClassName: string
  attributes: { [key: string]: string } | undefined
}

const variants = {
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
  hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
}

export const Dropdown = forwardRef(
  (
    { children, show, style, className, containerClassName, attributes }: DropdownProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [visible, setVisible] = useState(false)

    const onStart = useCallback(() => {
      if (show) {
        setVisible(true)
      }
    }, [show])

    const onComplete = useCallback(() => {
      if (!show) {
        setVisible(false)
      }
    }, [show])

    return createPortal(
      <motion.div
        ref={ref}
        style={style}
        className={className}
        animate={show ? 'visible' : 'hidden'}
        variants={variants}
        onAnimationStart={onStart}
        onAnimationComplete={onComplete}
        {...attributes}
      >
        {visible && <div className={`overflow-hidden flex flex-col ${containerClassName}`}>{children}</div>}
      </motion.div>,
      document.body
    )
  }
)
