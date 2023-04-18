import React from 'react'

export type Ref<T> = React.Dispatch<React.SetStateAction<T>> | React.ForwardedRef<T>

export function assignRef<T = any>(ref: Ref<T>, value: T | null) { // eslint-disable-line
  if (typeof ref === 'function') {
    ref(value as React.SetStateAction<T> & (T | null))
  } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value
  }
}
