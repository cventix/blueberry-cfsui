import * as React from "react";

// ui-elements
import { Icon } from "../Icon";

// icons
import errorIcon from "../../../images/error.svg";

// styles
import styles from "./Input.module.scss";

export default interface Iprops { 
	placeholder: string;
	onChange?: (e: any)=>void;
	label?: string;
	disabled?: boolean;
	message?: string;
	error?: boolean;
	success?: boolean
	style?: object;
}

export const TextInput = ({ 
	placeholder, 
	onChange, 
	label, 
	disabled = false, 
	message, 
	error = false, 
	success, 
	style}: Iprops) => {
	return (
		<div className={
			error ? `${styles.inputWrapper} ${styles.error}` :
			success ? `${styles.inputWrapper} ${styles.success}` :
			disabled ? `${styles.inputWrapper} ${styles.disabled}` : `${styles.inputWrapper}`
			} style={style}>
			<label className={styles.label}>{label}</label>
			<input type="text" 
			className={styles.textInput} 
			placeholder={placeholder} 
			disabled={disabled} 
			onChange={(e: any) =>  onChange && onChange(e.target.value)}
			/>
			<span className={error ? styles.shoowErorrMsg : styles.hide}>
				<Icon src={errorIcon} />
				<span>{message}</span>
			</span>
		</div>
	);
};
