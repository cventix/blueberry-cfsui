import React from 'react'
import { Icon } from '../Icon'
import bigger from '../../../images/bigger.svg'

import styles from './Breadcrumb.module.scss'
import { Link, Route } from 'react-router-dom'
import { t } from 'ttag'
import { MemoryRouter } from 'react-router'

export interface BreadcrumbItem {
  title: string
  link: string
  active?: boolean
  onClick?: any
  location?: any
  parent?: boolean
  id?: number
  path?: any
}

export default interface Iprops {
  history?: any
  modal?: boolean
  className?: string
}

export const Breadcrumb: React.FunctionComponent<Iprops> = ({ history, modal, className }) => {
  let historyArray = [{ link: '/', name: `پوشه اصلی` }]
  if (history && history.link) {
    history.link.split('/').map((item: any, index: number) => {
      let slug = history.link.split(item).pop()
      if (index !== 0 && item) historyArray.push({ link: slug, name: item })
    })
  }
  console.log(window.location.pathname == '/fm/trash')
  // return <div>jio</div>
  return (
    <div className={` ${modal ? [styles.breadcrumb, styles.modalbread, className].join(' ') : styles.breadcrumb}`}>
      {history ? (
        historyArray.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <span
              onClick={() => history.onClick(true, item.link, history.id)}
              className={index == historyArray.length - 1 ? [styles.active, styles.item].join(' ') : styles.item}
            >
              {item.name}
            </span>
            {index !== historyArray.length - 1 && <Icon src={bigger} />}
          </React.Fragment>
        ))
      ) : window.location.pathname == '/fm/trash' ? (
        <span className={[styles.active, styles.item].join(' ')}> سطل آشغال</span>
      ) : (
        <Route path="/:path" component={BreadcrumbsItem} />
      )}
    </div>
  )
}

const BreadcrumbsItem: React.FunctionComponent<any> = ({ match, ...rest }) => {
  let title = match.params.path === 'fm' ? t`پوشه اصلی` : match.params.path
  console.log(title)
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
