import React from 'react'

type WrapperProps = {
  status: number
  title: string
  message?: string
  fallback?: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ status, title, message, fallback }) => (
  <div className="error-page">
    <div className="error-page__status">{status}</div>
    <h1 className="error-page__title">{title}</h1>
    {message ? <p className="error-page__message">{message}</p> : <>{fallback}</>}
  </div>
)
