import * as React from 'react'

// ui-elements
import { MainFooter } from '../ui-elements/MainFooter/MainFooter'

// styles
import styles from './Main.module.scss'

export default interface Iprops {
  children?: any
  showModal?: boolean
}

export const Main: React.FunctionComponent<Iprops> = props => {
  return (
    <main className={`pg-relative pg-flex pg-flex-col
    pg-mt-70p pg-mr-sidebar pg-pt-10
    pg-pr-30p pg-pl-30p tablet-max:pg-mt-20
    tablet-max:pg-mr-0 tablet-max:pg-pt-5
    tablet-max:pg-pr-15p tablet-max:pg-pl-15p ${styles.main}`} {...props.showModal && { style: { zIndex: -2 } }}>
      <section className="pg-min-h-screen">{props.children}</section>
      <MainFooter />
    </main>
  )
}
