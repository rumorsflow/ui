import React from 'react'
import { IconRotateClockwise2 } from '@tabler/icons-react'

export const Loader: React.FC = () => (
  <div className="main__loader">
    <IconRotateClockwise2 className="animate-spin" size={100} />
  </div>
)
