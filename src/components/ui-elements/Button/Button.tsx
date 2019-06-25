import * as React from 'react'

// styles
import styles from './Button.module.scss'

export default interface Iprops {
  className?: string[]
  onClick?: (e: React.SyntheticEvent) => void
  style?: object
  children?: any
  disabled?: boolean
}

const classCreator = (className: any) => {
  return className.map((name: any) => name).join(' ')
}

export const Button = ({ className, onClick, style, children, disabled }: Iprops) => {
  
  return (
    <button
      disabled={disabled}
      className={className ? `pg-btn ${classCreator(className)}` : `pg-btn`}
      onClick={e => onClick && onClick(e)}
      style={style}
    >
      {children}
    </button>
  )
}
