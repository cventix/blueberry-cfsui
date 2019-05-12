import * as React from 'react'

// styles
import styles from './Toast.module.scss'

export default interface Iprops {
  level?: string
  width?: number
  visible?: boolean
  message?: string
  caret?: boolean
}

export const Toast: React.FunctionComponent<Iprops> = ({level,visible=false,caret,width,children})=>{
  let classes = `${styles.toast} ${level && styles[level]} `
  classes += visible ? `${styles.visible}` : ''
  classes += caret ? `${styles.caret}` : ''
  return (
    <div className={classes} style={{ width: width }}>
      <p>{children}</p>
    </div>
  )
}
