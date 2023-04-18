import React from 'react'
import { Link } from 'react-router-dom'

export type Item = {
  to: string
  label: string
  active: boolean
}

type NavItemProps = {
  data: Item[]
}

export const NavItem: React.FC<NavItemProps> = ({ data }) => (
  <ul className="filter">
    {data.map((item) => (
      <li key={item.label}>
        <Link to={item.to} className={item.active ? 'filter__link filter__link_active' : 'filter__link'}>
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
)
