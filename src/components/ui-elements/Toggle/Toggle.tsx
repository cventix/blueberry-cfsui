import React from 'react'
import styles from './Toggle.module.scss'

interface Iprops {
  checked: boolean
  disabled?: boolean
  onToggle?: (e: boolean) => void
  className?: string
  name?: string
}

const Toggle: React.FunctionComponent<Iprops> = ({ checked, disabled, onToggle,name, className }) => (
  <label className={disabled && checked  ? `${styles.onDisabled} ${styles.switch}` : disabled ? `${styles.disabled} ${styles.switch}` : styles.switch} {...onToggle && { onClick: () => onToggle(checked) }}>
    <input type="checkbox" checked={checked} value={name}/>
    <span className={styles.knob} />
  </label>
)
export default Toggle
