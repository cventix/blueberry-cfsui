import React from 'react'
import { Icon } from '../Icon'
import bigger from '../../../images/bigger.svg'

import styles from './Breadcrumb.module.scss'
import { Link, Route } from 'react-router-dom'
import { t } from 'ttag'

export interface BreadcrumbItem {
  title: string
  link: string
  active?: boolean
  onClick?: any
  location?: any
}

export default interface Iprops {
  history: any
  modal?: boolean
  className?: string
}

export const Breadcrumb: React.FunctionComponent<Iprops> = ({ modal, className }) => (
  <div className={` ${modal ? [styles.breadcrumb, styles.modalbread, className].join(' ') : styles.breadcrumb}`}>
    <Route path="/:path" component={BreadcrumbsItem} />
  </div>
)

const BreadcrumbsItem: React.FunctionComponent<any> = ({ match, ...rest }) => {
  let title = match.params.path === 'fm' ? t`پوشه اصلی` : match.params.path
  return (
    <span>
      <Link className={match.isExact ? [styles.active, styles.item].join(' ') : styles.item} to={match.url || ''}>
        {title}
      </Link>
      {!match.isExact && <Icon src={bigger} />}
      <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
    </span>
  )
}

// <div className={` ${modal ? [styles.breadcrumb, styles.modalbread, className].join(' ') : styles.breadcrumb}`}>
//   {history.map((item: BreadcrumbItem, index: number) => {
//     return !item.onClick ? (
//       <React.Fragment key={index}>
//         <Link to={item.link} className={item.active ? [styles.active, styles.item].join(' ') : styles.item}>
//           {item.title}
//         </Link>
//         {!item.active && <Icon src={bigger} />}
//       </React.Fragment>
//     ) : (
//       <React.Fragment key={index}>
//         <span onClick={() => item.onClick()} className={item.active ? [styles.active, styles.item].join(' ') : styles.item}>
//           {item.title}
//         </span>
//         {!item.active && <Icon src={bigger} />}
//       </React.Fragment>
//     )
//   })}
// </div>
// )}
