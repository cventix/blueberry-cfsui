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
}

export const Breadcrumb: React.FunctionComponent<Iprops> = ({ history }) => (
  <div className={styles.breadcrumb}>
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
