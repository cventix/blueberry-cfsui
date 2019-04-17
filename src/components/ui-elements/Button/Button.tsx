import * as React from 'react'

// styles
import styles from './Button.module.scss'

export default interface Iprops {
  className?: string[]
  onClick?: () => void
  style?: object
  children?: any
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const Button: React.FunctionComponent<Iprops> = props => {
  return (
    <button
      className={props.className ? `${styles.btn} ${classCreator(props.className)}` : `${styles.btn}`}
      onClick={() => props.onClick && props.onClick()}
      style={props.style}
    >
      {props.children}
    </button>
  )
}
