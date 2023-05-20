import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBell, IconRefreshDot, IconTrashFilled } from '@tabler/icons-react'

import { useToggle } from '@/hooks'
import { useArticles } from '@/store'
import { Popover } from '@/ui'

import { Badge } from './badge'
import { Content } from './content'

const offset: [number, number] = [0, 11]

export const Notifications: React.FC = () => {
  const navigate = useNavigate()
  const { articles, clear } = useArticles((state) => ({ articles: state.articles, clear: state.clear }))
  const [show, toggle] = useToggle()

  const onClear = useCallback(() => {
    clear()
    toggle(false)
  }, [clear, toggle])

  const onRefresh = useCallback(() => {
    onClear()
    navigate('/')
  }, [onClear, navigate])

  return (
    <Popover
      placement="bottom"
      strategy="fixed"
      className="notifications"
      containerClassName="notifications__container"
      buttonClassName="header__btn"
      offset={offset}
      show={show}
      toggle={toggle}
      buttonContent={
        <>
          <span className="sr-only">Notifications</span>
          <span className="relative inline-block">
            <IconBell size={24} stroke={1.5} />
            {articles.length > 0 && <Badge ping={true} />}
          </span>
        </>
      }
    >
      {articles.length > 0 ? (
        <>
          <Content articles={articles} />
          <div className="notifications__footer">
            <button type="button" className="notifications__clear" onClick={onRefresh}>
              <IconRefreshDot size={16} stroke={2} />
              refresh
            </button>
            <button type="button" className="notifications__clear" onClick={onClear}>
              <IconTrashFilled size={16} stroke={1.5} />
              clear
            </button>
          </div>
        </>
      ) : (
        <h5 className="notifications__no-data">no new rumors</h5>
      )}
    </Popover>
  )
}
