import React from 'react'
import styles from './Toggle.module.scss'

interface Iprops {
  checked: boolean
  disabled?: boolean
  vmSwitch?: boolean
  onToggle?: (e: boolean) => void
  className?: string
  name?: string
}

// Toggle Mode Style
// className={vmSwitc ? `${styles.switch} ${styles.vmSwitch}` : disabled && checked ? `${styles.switch} ${styles.onDisabled} ${styles.vmSwitch}` : disabled ? `${styles.disabled} ${styles.switch}` : styles.switch}

const Toggle: React.FunctionComponent<Iprops> = ({ checked, disabled, onToggle, name, className }) =>
  className ? (
    <label className={styles[className]}>
      <input type="checkbox" checked={checked} value={name} />
      <span className={styles.knob} />
    </label>
  ) : (
    <label
      className={disabled && checked ? `${styles.onDisabled} ${styles.switch}` : disabled ? `${styles.disabled} ${styles.switch}` : styles.switch}
      {...onToggle && { onClick: () => onToggle(checked) }}
    >
      <input type="checkbox" checked={checked} value={name} />
      <span className={styles.knob} />
    </label>
  )
export default Toggle
