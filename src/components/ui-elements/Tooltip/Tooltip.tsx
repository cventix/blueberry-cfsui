import * as React from 'react'

// styles
import styles from './Tooltip.module.scss'

export default interface Iprops {
  children: string
  width?: number
}

export const Tooltip = ({children, width}: Iprops) => {
  return (
    <div className={styles.tooltip} style={{ width: width }}>
  children}
    </div>
  )
}
