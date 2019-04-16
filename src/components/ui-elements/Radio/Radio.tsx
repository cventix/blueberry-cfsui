import * as React from 'react'

// styles
import styles from './Radio.module.scss'

export default interface Iprops {
	disabled?: boolean;
	checked?: boolean;
	name: string;
	value: string;
	onChange?: (e: any)=>void;
}

export const Radio = ({ disabled = false,  checked = false, name, value, onChange }: Iprops) => {
	return (
		<label className = {(disabled && checked) ? `${styles.radio} ${styles.disableWithChecked}` : disabled ? `${styles.radio} ${styles.disabled}` : `${styles.radio}`} >
			<input 
			type="radio"
			name={name}
			value={value}
			disabled={disabled} 
			{...(checked ? {checked:checked} : {onChange:(e: any)=>  onChange && onChange(e)})}
			/>
			<span className={styles.checkmark}></span>
		</label>
	);
};
