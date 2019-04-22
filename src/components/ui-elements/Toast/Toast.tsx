import * as React from 'react'

// styles
import styles from './Toast.module.scss'

export default interface Iprops {
  children: string
  error?: boolean
  success?: boolean
  width?: number
}

export const Toast = ({children, error, success, width}: Iprops) => {
  return (
    <div 
    className={success ? `${styles.toast} ${styles.success}` : `${styles.toast} ${styles.error}`} 
    style={{ width: width }}>
      {children}
    </div>
  )
}
