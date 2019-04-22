import * as React from 'react'

// styles
import styles from './Tooltip.module.scss'

export default interface Iprops {
  children: string
  width?: number
}
//todo position handling
export const Tooltip: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={styles.tooltip} style={{ width: props.width }}>
      {props.children}
    </div>
  )
}
