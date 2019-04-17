import * as React from 'react'

// ui-elements
import { Icon } from '../Icon'

// icons
import errorIcon from '../../../images/error.svg'

// styles
import styles from './Input.module.scss'

export default interface Iprops {
  placeholder: string
  onChange?: (e: any) => void
  label?: string
  disabled?: boolean
  message?: string
  error?: boolean
  success?: boolean
  withIcon?: boolean
  icon?: string
  right?: boolean
  left?: boolean
  style?: object
}

export const TextInput = ({
  placeholder,
  onChange,
  label,
  disabled = false,
  message,
  error = false,
  success,
  withIcon,
  icon,
  right,
  left,
  style,
}: Iprops) => {
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
        className={
          withIcon && right ? `${styles.textInput} ${styles.right}` : withIcon && left ? `${styles.textInput} ${styles.left}` : `${styles.textInput}`
        }
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e: any) => onChange && onChange(e.target.value)}
        style={style}
      />
      <Icon className={withIcon ? styles.withIcon : styles.hide} src={icon} />
      <span className={error ? styles.shoowErorrMsg : styles.hide}>
        <Icon src={errorIcon} />
        <span>{message}</span>
      </span>
    </div>
  )
}
