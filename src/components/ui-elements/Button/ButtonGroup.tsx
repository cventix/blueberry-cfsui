import * as React from 'react'

// styles
import styles from './Button.module.scss'

export const ButtonGroup: React.FunctionComponent<any> = props => {
  return (
    <div className={styles.row}>
      {props.list.map((each: any) => (
        <button className={[styles.btnGroup, each.active && styles.active].join(' ')}> {each.label} </button>
      ))}
    </div>
  )
}
