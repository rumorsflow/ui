import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const refImg = useRef<HTMLImageElement>(null)
  const isInView = useInView(ref, { once: true })
  const [loading, setLoading] = useState(true)

  const onLoad = useCallback(() => setLoading(false), [setLoading])

  useEffect(() => {
    if (!refImg.current || !refImg.current.complete) {
      setLoading(true)
    }
  }, [src])

  return (
    <div ref={ref} className={['image', className].join(' ')}>
      {isInView && (
        <>
          <motion.img
            ref={refImg}
            src={src}
            alt={alt}
            onLoad={onLoad}
            animate={loading ? 'hidden' : 'visible'}
            variants={variants}
          />
          {!!thumb && (
            <motion.span animate={loading ? 'visible' : 'hidden'} variants={variants}>
              {thumb}
            </motion.span>
          )}
        </>
      )}
    </div>
  )
}
