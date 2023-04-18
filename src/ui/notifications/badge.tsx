import React from 'react'

type BadgeProps = {
  ping: boolean
}

export const Badge: React.FC<BadgeProps> = ({ ping }) => (
  <span className="absolute top-0.5 right-0.5 translate-x-1/2 -translate-y-1/2 flex h-3 w-3">
    {ping && <span className="ping-circle-badge"></span>}
    <span className="circle-badge"></span>
  </span>
)
