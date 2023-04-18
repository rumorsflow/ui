import React, { createContext } from 'react'

export type Mode = 'light' | 'dark'

export type ThemeContextProps = {
  mode?: Mode
  toggleMode?: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({})

type ThemeProviderProps = {
  children: React.ReactNode
  value: ThemeContextProps
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, value }) => (
  <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
)
