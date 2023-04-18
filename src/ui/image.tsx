import React, { useCallback, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type ImageProps = {
  src: string
  alt: string
  className?: string
  thumb?: React.ReactNode
}

const variants = {
  visible: { opacity: 1, transition: { duration: 0 } },
  hidden: { opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const Image: React.FC<ImageProps> = ({ src, alt, className = '', thumb }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [loading, setLoading] = useState(true)

  const onLoad = useCallback(() => setLoading(false), [setLoading])

  return (
    <div ref={ref} className={['image', className].join(' ')}>
      {isInView && (
        <>
          <motion.img
            src={src}
            alt={alt}
            onLoad={onLoad}
            layout
            animate={loading ? 'hidden' : 'visible'}
            variants={variants}
          />
          <motion.span layout animate={loading ? 'visible' : 'hidden'} variants={variants}>
            {thumb}
          </motion.span>
        </>
      )}
    </div>
  )
}
