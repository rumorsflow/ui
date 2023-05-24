import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { APP_NAME_CAPTION, APP_NAME_LONG, APP_NAME_SHORT } from '@/config'
import { useArticles } from '@/store'

type HeaderProps = {
  menu?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ menu }) => {
  const navigate = useNavigate()
  const { clear } = useArticles((state) => ({ clear: state.clear }))

  const onHome = useCallback(() => {
    clear()
    navigate('/')
  }, [clear, navigate])

  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__item">
            {APP_NAME_CAPTION.length > 0 && <span className="header__caption">{APP_NAME_CAPTION}</span>}
            <a onClick={onHome} className="header__logo">
              <span className="sr-only">{APP_NAME_LONG}</span>
              <span className="hidden lg:block">{APP_NAME_LONG}</span>
              <span className="lg:hidden">{APP_NAME_SHORT}</span>
            </a>
          </div>
          <div className="header__item">{menu}</div>
        </div>
      </header>
    </>
  )
}
