import * as React from 'react'

// styles
import styles from './Checkbox.module.scss'

export default interface Iprops {
  disabled?: boolean
  checked?: boolean
  className?: string
  type?: string
  onChange?: (e: any) => void
  onClick?: any
}

const createClassName = (type?: string, disabled?: boolean, checked?: boolean) => {
  let classNames = [`${styles.checkbox}`]
  if (disabled) classNames.push(`${styles.disabled}`)
  if (disabled && checked) classNames.push(`${styles.disableWithChecked}`)
  if (type === 'indeterminate') classNames.push(`${styles.indeterminate}`)
  return classNames.join(' ')
}

export const Checkbox = ({ disabled = false, checked = false, className, type, onClick, onChange }: Iprops) => {
  return (
    <label className={className ? createClassName(type, disabled, checked) + ' ' + className : createClassName(type, disabled, checked)}>
      <input
        onClick={onClick}
        type="checkbox"
        disabled={disabled}
        {...(checked ? { checked: checked } : { onChange: (e: any) => onChange && onChange(e) })}
      />
      <span className={styles.checkmark} />
    </label>
  )
}
