import React from 'react'
import { IconFilter } from '@tabler/icons-react'

import { Drawer } from '@/ui'

import { Nav } from './nav'

export const Filters: React.FC = () => (
  <Drawer
    buttonClassName="header__btn"
    buttonContent={
      <>
        <span className="sr-only">Filters</span>
        <IconFilter size={24} stroke={1.5} />
      </>
    }
  >
    <Nav />
  </Drawer>
)
