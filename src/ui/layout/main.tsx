import React from 'react'
import { createPortal } from 'react-dom'
import { Outlet } from 'react-router-dom'

import { Loader } from '@/ui'

import { Header } from './header'
import { Footer } from './footer'
import { Affix } from './affix'

type MainLayoutProps = {
  headerMenu?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ headerMenu }) => (
  <>
    <Header menu={headerMenu} />
    <main className="main">
      <React.Suspense fallback={<Loader />}>
        <Outlet />
      </React.Suspense>
    </main>
    <Footer />
    {createPortal(<Affix />, document.body)}
  </>
)
