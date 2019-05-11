import * as React from 'react'

// styles
import styles from './Tooltip.module.scss'

export default interface Iprops {
  children: any
  width?: number
  text?: string
  position?: string
  height?: number
}

//todo position handling
export const Tooltip: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={[styles.tooltip, props.position === 'bottom' && styles.columnReverse].join(' ')}>
      <div className={styles.flex}>{props.children}</div>
      <div className={styles.text}>
        <span style={{ width: props.width, height: props.height }} className={[styles.text, props.position && styles[props.position]].join(' ')}>
          {props.text}
        </span>
      </div>
    </div>
  )
}
