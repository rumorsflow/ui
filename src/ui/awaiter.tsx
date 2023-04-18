import React from 'react'
import { Await } from 'react-router-dom'

import { useLoaderData } from '@/hooks'

import { Loader } from './loader'
import { AsyncErrorPage } from './error'

type AwaiterProps = {
  children: React.ReactNode
}

export const Awaiter: React.FC<AwaiterProps> = ({ children }) => {
  const data = useLoaderData()

  return (
    <React.Suspense fallback={<Loader />}>
      <Await resolve={data} errorElement={<AsyncErrorPage />}>
        {children}
      </Await>
    </React.Suspense>
  )
}
