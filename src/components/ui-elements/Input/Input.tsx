import * as React from 'react'

// ui-elements
import { Icon } from '../Icon'

// icons
import errorIcon from '../../../images/error.svg'

// styles
import styles from './Input.module.scss'

export default interface Iprops {
  placeholder?: string
  onChange?: (e: any) => void
  onBlur?: () => void
  label?: string
  disabled?: boolean
  message?: string
  error?: boolean
  success?: boolean
  withIcon?: boolean
  icon?: string
  style?: object
  name?: string
  type?: string
  value?: string
  onClick?: any
  wrapperRef?: any
  className?: string
}

export const TextInput = ({
  placeholder,
  onChange,
  wrapperRef,
  name,
  label,
  value,
  type = 'text',
  disabled = false,
  message,
  onBlur,
  error = false,
  success,
  withIcon,
  icon,
  onClick,
  className,
  style
}: Iprops) => {
  
  return (
    <div
      className={
        error
          ? `${styles.inputWrapper} ${styles.error} ${className}`
          : success
          ? `${styles.inputWrapper} ${styles.success} ${className}`
          : disabled
          ? `${styles.inputWrapper} ${styles.disabled} ${className}`
          : `${styles.inputWrapper} ${className}`
      }
      style={style}
    >
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        ref={wrapperRef}
        className={withIcon ? styles.textInput : `${styles.textInput} ${styles.reset}`}
        placeholder={placeholder}
        onClick={onClick}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e: any) => onChange && onChange(e)}
        onBlur={() => onBlur && onBlur()}
      />
      <Icon className={withIcon ? styles.withIcon : `hide`} src={icon} />
      <span className={error ? styles.shoowErorrMsg : `hide`}>
        <Icon src={errorIcon} />
        <span>{message}</span>
      </span>
    </div>
  )
}
