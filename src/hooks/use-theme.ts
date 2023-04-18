import { useContext } from 'react'

import { ThemeContext, ThemeContextProps } from '@/ui'

export const useTheme = (): ThemeContextProps => useContext(ThemeContext)
