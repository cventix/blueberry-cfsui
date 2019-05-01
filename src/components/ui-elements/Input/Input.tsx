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
  label?: string
  disabled?: boolean
  message?: string
  error?: boolean
  success?: boolean
  withIcon?: boolean
  icon?: string
  style?: object
  name?: string
  value?: string
}

export const TextInput = ({ placeholder, onChange,name, label,value, disabled = false, message, error = false, success, withIcon, icon, style }: Iprops) => {
  return (
    <div
      className={
        error
          ? `${styles.inputWrapper} ${styles.error}`
          : success
          ? `${styles.inputWrapper} ${styles.success}`
          : disabled
          ? `${styles.inputWrapper} ${styles.disabled}`
          : `${styles.inputWrapper}`
      }
      style={style}
    >
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        className={withIcon ? styles.textInput : `${styles.textInput} ${styles.reset}`}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        onChange={(e: any) => onChange && onChange(e)}
      />
      <Icon className={withIcon ? styles.withIcon : `hide`} src={icon} />
      <span className={error ? styles.shoowErorrMsg : `hide`}>
        <Icon src={errorIcon} />
        <span>{message}</span>
      </span>
    </div>
  )
}
