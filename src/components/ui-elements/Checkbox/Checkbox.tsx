import * as React from "react";

// styles
import styles from "./Checkbox.module.scss";

export default interface Iprops {
	disabled?: boolean;
	checked?: boolean;
	className?: string;
	type?: string;
	onChange?: (e: any)=>void;
}

const createClassName = (type?: string, disabled?: boolean, checked?: boolean) => {
	let classNames = [`${styles.checkbox}`];
	if (disabled)
		classNames.push(`${styles.disabled}`);
	if (disabled && checked)
		classNames.push(`${styles.disableWithChecked}`);
	if (type === 'indeterminate')
		classNames.push(`${styles.indeterminate}`);
	return classNames.join(' ');
}

export const Checkbox = ({ disabled = false,  checked = false, className, type, onChange }: Iprops) => {
	return (
		<label className = {createClassName(type, disabled, checked)}>
			<input 
			type="checkbox" 
			disabled={disabled} 
			{...(checked ? {checked:checked} : {onChange:(e: any) =>  onChange && onChange(e)})}
			/>
			<span className={styles.checkmark}></span>
		</label>
	);
};
