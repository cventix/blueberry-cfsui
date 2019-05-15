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

export const Tooltip: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={[styles.tooltip, props.position === 'top' 
    && styles.top, props.position === 'left' 
    && styles.left, props.position === 'right' 
    && styles.right ].join(' ')}>
      <div className={styles.hasTooltip}>{props.children}</div>
      <div style={{ width: props.width, height: props.height }} 
        className={[styles.text, props.position && styles[props.position]].join(' ')}>
        {props.text}
      </div>
    </div>
  )
}
