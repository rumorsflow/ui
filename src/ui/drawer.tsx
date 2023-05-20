import React, { useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { IconX } from '@tabler/icons-react'

import { useClickOutside, useToggle } from '@/hooks'

import { Overlay } from './overlay'

type DrawerProps = {
  placement?: 'left' | 'right'
  disabled?: boolean
  title?: string
  buttonClassName: string
  buttonContent: React.ReactNode
  children: React.ReactNode
}

export const Drawer: React.FC<DrawerProps> = ({
  placement = 'right',
  disabled = false,
  title,
  buttonClassName,
  buttonContent,
  children,
}) => {
  const [show, toggle] = useToggle()

  const onShow = useCallback(() => toggle(true), [toggle])
  const onHide = useCallback(() => toggle(false), [toggle])

  const ref = useClickOutside(onHide)

  const className = useMemo(
    () =>
      placement === 'left'
        ? show
          ? 'drawer_left-active'
          : 'drawer_left'
        : show
        ? 'drawer_right-active'
        : 'drawer_right',
    [placement, show]
  )

  return (
    <>
      <button type="button" disabled={disabled} className={buttonClassName} onClick={onShow}>
        {buttonContent}
      </button>
      <Overlay motionKey="drawer-overlay" show={show} />
      {createPortal(
        <div ref={ref} className={`drawer ${className}`}>
          {title && <h5 className="drawer__title">{title}</h5>}
          <button type="button" onClick={onHide} className="drawer__close">
            <span className="sr-only">Close menu</span>
            <IconX size={22} />
          </button>
          {children}
        </div>,
        document.body
      )}
    </>
  )
}
