import React from 'react'
import { Icon } from '../Icon'
import bigger from '../../../images/bigger.svg'

import styles from './Breadcrumb.module.scss'
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  title: string
  link: string
  active?: boolean
  onClick?: any
 
}

export default interface Iprops {
  history: BreadcrumbItem[]
  modal?:boolean
}

export const Breadcrumb: React.FunctionComponent<Iprops> = ({ history , modal}) => (
  <div className={` ${modal? [styles.breadcrumb,styles.modalbread].join(" ") :styles.breadcrumb}`}>
    {history.map((item: BreadcrumbItem, index: number) => {
      return !item.onClick ? (
        <React.Fragment key={index}>
          <Link to={item.link} className={item.active ? [styles.active, styles.item].join(' ') : styles.item}>
            {item.title}
          </Link>
          {!item.active && <Icon src={bigger} />}
        </React.Fragment>
      ) : (
        <React.Fragment key={index}>
          <span onClick={() => item.onClick()} className={item.active ? [styles.active, styles.item].join(' ') : styles.item}>
            {item.title}
          </span>
          {!item.active && <Icon src={bigger} />}
        </React.Fragment>
      )
    })}
  </div>
)
