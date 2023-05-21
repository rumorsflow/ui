import React from 'react'

type ContentProps = {
  title: string
  link: string
  desc?: string
}

export const Content: React.FC<ContentProps> = ({ title, link, desc = '' }) => (
  <div className="content">
    <h2 className="content__title">
      <a href={link} target="_blank" rel="noreferrer">
        {title}
      </a>
    </h2>
    {desc.length > 0 && (
      <p className="content__desc">
        <a href={link} target="_blank" rel="noreferrer">
          {desc}
        </a>
      </p>
    )}
  </div>
)
