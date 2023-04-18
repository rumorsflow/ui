import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { APP_NO_SSE } from '@/config'
import { Filters, Loader, MainLayout, Notifications } from '@/ui'

const router = createBrowserRouter([
  {
    element: (
      <MainLayout
        headerMenu={
          <>
            {!APP_NO_SSE && <Notifications />}
            <Filters />
          </>
        }
      />
    ),
    id: 'main',
    children: [
      {
        path: '/',
        lazy: () => import('../../pages/home/home'),
        shouldRevalidate: () => true,
      },
    ],
  },
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <>
      <RouterProvider router={router} fallbackElement={<Loader />} />
      {component()}
    </>
  )
