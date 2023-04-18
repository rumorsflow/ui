import React from 'react'
import { Link } from 'react-router-dom'

import { APP_NAME_CAPTION, APP_NAME_LONG, APP_NAME_SHORT } from '@/config'

type HeaderProps = {
  menu?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ menu }) => {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div className="header__item">
            {APP_NAME_CAPTION.length > 0 && <span className="header__caption">{APP_NAME_CAPTION}</span>}
            <Link to="/" className="header__logo">
              <span className="sr-only">{APP_NAME_LONG}</span>
              <span className="hidden lg:block">{APP_NAME_LONG}</span>
              <span className="lg:hidden">{APP_NAME_SHORT}</span>
            </Link>
          </div>
          <div className="header__item">{menu}</div>
        </div>
      </header>
    </>
  )
}
