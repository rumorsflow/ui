import React, { useMemo } from 'react'

import { useHotkeys, useThemeMode } from '@/hooks'
import { ThemeProvider } from '@/ui'

export const withTheme = (component: () => React.ReactNode) => () => {
  const [mode, , toggleMode] = useThemeMode()

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  useHotkeys([
    ['ctrl+J', toggleMode],
    ['mod+J', toggleMode],
  ])

  return <ThemeProvider value={value}>{component()}</ThemeProvider>
}
