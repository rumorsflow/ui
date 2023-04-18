import { useCallback } from 'react'

import { assignRef, Ref } from '@/lib'

export function mergeRefs<T = any>(...refs: Ref<T>[]) { // eslint-disable-line
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node))
  }
}

export function useMergedRef<T = any>(...refs: Ref<T>[]) { // eslint-disable-line
  return useCallback(mergeRefs(...refs), refs) // eslint-disable-line
}
