import * as React from 'react'

// styles
import styles from './Button.module.scss'

export const ButtonGroup: React.FunctionComponent<any> = props => {
  return (
    <div className={styles.row}>
      {props.list.map((each: any, index: number) => (
        <button key={index} className={[styles.btnGroup,'pg-btn','pg-flex-1', each.active &&styles.active].join(' ')} onClick={() => each.onClick(each.label)}>
          {each.label}
        </button>
      ))}
    </div>
  )
}
