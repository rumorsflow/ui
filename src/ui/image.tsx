import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type ImageProps = {
  src: string
  alt: string
  className?: string
  thumb?: React.ReactNode
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
          <img
            ref={refImg}
            src={src}
            alt={alt}
            onLoad={onLoad}
            className={`transition-opacity duration-500 ease-in ${loading ? 'opacity-0' : 'opacity-100'}`}
          />
          {!!thumb && (
            <span className={`transition-opacity duration-500 ease-out ${loading ? 'opacity-100' : 'opacity-0'}`}>
              {thumb}
            </span>
          )}
        </>
      )}
    </div>
  )
}
