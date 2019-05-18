import React from 'react'
import styles from './Toggle.module.scss'

interface Iprops {
  checked: boolean
  disabled?: boolean
  vmSwitc?: boolean
  onToggle?: (e: boolean) => void
  className?: string
}
const Toggle: React.FunctionComponent<Iprops> = ({ checked, disabled, onToggle, className , vmSwitc}) => (
	<label className={vmSwitc ? `${styles.switch} ${styles.vmSwitch}` : disabled && checked ? `${styles.switch} ${styles.onDisabled} ${styles.vmSwitch}` : disabled ? `${styles.disabled} ${styles.switch}` : styles.switch} 
		{...onToggle && { onClick: () => onToggle(checked) }}>
		<input type="checkbox" defaultChecked={checked} />
		<span className={styles.knob} />
	</label>
)
export default Toggle
