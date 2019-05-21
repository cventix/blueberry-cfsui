import * as React from 'react'

import { MainFooter } from '../ui-elements/MainFooter/MainFooter'

// styles
import styles from './Main.module.scss'

export default interface Iprops {
  children?: any
  showModal?: boolean
}

export const Main: React.FunctionComponent<Iprops> = props => {
  return (
    <section className={styles.main} {...props.showModal && { style: { zIndex: -2 } }}>
      <section className={styles.contentWrapper}>{props.children}</section>
      <MainFooter />
    </section>
  )
}
