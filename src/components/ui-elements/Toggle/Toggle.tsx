import React from 'react'
import styles from './Toggle.module.scss'

interface Iprops {
  checked: boolean
  disabled?: boolean
  onToggle?: (e: boolean) => void
  className?: string
}
const Toggle: React.FunctionComponent<Iprops> = ({ checked, disabled, onToggle, className }) => (
  <label className={disabled && checked  ? `${styles.onDisabled} ${styles.switch}` : disabled ? `${styles.disabled} ${styles.switch}` : styles.switch} {...onToggle && { onClick: () => onToggle(checked) }}>
    <input type="checkbox" defaultChecked={checked} />
    <span className={styles.knob} />
  </label>
)
export default Toggle
