import React, { useCallback, useEffect, useState } from 'react'

import { Mode } from '@/ui'

import { useHotkeys, useTheme } from '.'

const THEME_STORAGE_KEY = 'rumors.theme.color-scheme'

const userPreferenceIsDark = () => {
  const s = window.localStorage.getItem(THEME_STORAGE_KEY)

  return s === null ? !!window.matchMedia?.('(prefers-color-scheme: dark)').matches : s === 'dark'
}

const getPrefersColorScheme = (): Mode => (userPreferenceIsDark() ? 'dark' : 'light')

export const useThemeMode = (): [Mode, React.Dispatch<React.SetStateAction<Mode>>, () => void] => {
  const onToggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    setMode(newMode)
    setModeState(newMode)
  }
  const { mode: contextMode, toggleMode = onToggleMode } = useTheme()
  const [mode, setModeState] = useState<Mode>(contextMode ? contextMode : getPrefersColorScheme())
  const setMode = useCallback((mode: Mode) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode)

    if (mode === 'dark') {
      document.documentElement.classList.add('dark')

      return
    }

    document.documentElement.classList.remove('dark')
  }, [])

  useHotkeys([
    ['ctrl+J', toggleMode],
    ['mod+J', toggleMode],
  ])

  useEffect(() => {
    setMode(contextMode ?? getPrefersColorScheme())

    if (contextMode) {
      setModeState(contextMode)
    }
  }, [contextMode, setMode, setModeState])

  return [mode, setModeState, toggleMode]
}
