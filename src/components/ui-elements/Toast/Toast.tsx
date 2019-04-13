import * as React from 'react'

// styles
import styles from './Toast.module.scss'

export default interface Iprops {
  children: string
  type: string
}

export const Toast: React.FunctionComponent<Iprops> = props => {
  return <div className={props.type == 'success' ? `${styles.toast} ${styles.success}` : `${styles.toast} ${styles.error}`}>{props.children}</div>
}
