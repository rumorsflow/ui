import React, { useCallback, useMemo, useState } from 'react'
import { usePopper } from 'react-popper'
import * as PopperJS from '@popperjs/core'

import { useClickOutside } from '@/hooks'

import { Dropdown } from './dropdown'

type PopoverProps = {
  placement?: PopperJS.Placement
  strategy?: PopperJS.PositioningStrategy
  offset: [number, number]
  className: string
  containerClassName: string
  buttonClassName: string
  buttonContent: React.ReactNode
  children: React.ReactNode
  show: boolean
  toggle: (value?: boolean) => void
}

export const Popover: React.FC<PopoverProps> = ({
  placement = 'auto',
  strategy = 'absolute',
  offset,
  className,
  containerClassName,
  buttonClassName,
  buttonContent,
  children,
  show,
  toggle,
}) => {
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null)
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)
  const nodes = useMemo(() => [buttonRef, dropdownRef], [buttonRef, dropdownRef])

  useClickOutside(() => toggle(false), null, nodes)

  const onToggle = useCallback(() => toggle(), [toggle])

  const { styles, attributes } = usePopper(buttonRef, dropdownRef, {
    placement,
    strategy,
    modifiers: [
      {
        name: 'preventOverflow',
        enabled: true,
        options: {
          altAxis: true,
          altBoundary: true,
          tether: true,
          rootBoundary: 'document',
        },
      },
      { name: 'offset', options: { offset } },
    ],
  })

  return (
    <>
      <button type="button" ref={setButtonRef} onClick={onToggle} className={buttonClassName}>
        {buttonContent}
      </button>
      <Dropdown
        ref={setDropdownRef}
        show={show}
        style={styles.popper}
        className={className}
        containerClassName={containerClassName}
        attributes={attributes.popper}
      >
        {children}
      </Dropdown>
    </>
  )
}
