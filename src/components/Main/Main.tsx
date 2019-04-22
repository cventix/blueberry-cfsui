import * as React from 'react'

// styles
import styles from './Main.module.scss'

export default interface Iprops {
  children?: any
}

export const Main = ({children}: Iprops) => {
  return <section className={styles.main}>{children}</section>
}
