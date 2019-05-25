import React from 'react'
import { Icon } from '../Icon'
import bigger from '../../../images/bigger.svg'

import styles from './Breadcrumb.module.scss'

export interface BreadcrumbItem {
  title: string
  link: string
  active?: boolean
}

export default interface Iprops {
  history: BreadcrumbItem[]
  className?: string
}

export const Breadcrumb: React.FunctionComponent<Iprops> = ({ history, className }) => (
  <div className={[styles.breadcrumb, className].join(' ')}>
    {history.map((item: BreadcrumbItem, index: number) => {
      return (
        <React.Fragment key={index}>
          <a href={item.link} className={item.active ? [styles.active, styles.item].join(' ') : styles.item}>
            {item.title}
          </a>
          {!item.active && <Icon src={bigger} />}
        </React.Fragment>
      )
    })}
  </div>
)
