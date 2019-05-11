import * as React from 'react'

// styles
import styles from './Button.module.scss'

export default interface Iprops {
  className?: string[]
  onClick?: () => void
  style?: object
  children?: any
  disabled?: boolean
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const Button = ({className, onClick, style, children, disabled}: Iprops) => {
  return (
    <button
      disabled={disabled}
      className={className ? `${styles.btn} ${classCreator(className)}` : `${styles.btn}`}
      onClick={() => onClick && onClick()}
      style={style}
    >
      {children}
    </button>
  )
}
