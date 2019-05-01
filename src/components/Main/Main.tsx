import * as React from 'react'

// styles
import styles from './Main.module.scss'

export default interface Iprops {
  children?: any
  showModal?: boolean
}

export const Main: React.FunctionComponent<Iprops> = props => {
  return (
    <section className={styles.main} {...props.showModal && { style: { zIndex: -2 } }}>
      {props.children}
    </section>
  )
}
