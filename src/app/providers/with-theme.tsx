import React, { useMemo } from 'react'

import { useThemeMode } from '@/hooks'
import { ThemeProvider } from '@/ui'

export const withTheme = (component: () => React.ReactNode) => () => {
  const [mode, , toggleMode] = useThemeMode()

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  return <ThemeProvider value={value}>{component()}</ThemeProvider>
}
