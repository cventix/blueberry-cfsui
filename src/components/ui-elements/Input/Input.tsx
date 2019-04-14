import * as React from "react";

// ui-elements
import { Icon } from "../Icon";

// icons
import errorIcon from "../../../images/error.svg";

// styles
import styles from "./Input.module.scss";

export default interface Iprops { 
	label?: string;
	disabled?: boolean;
	placeholder: string;
	message?: string;
}

export const TextInput = ({ placeholder, label, disabled, message }: Iprops) => {
	return (
		<div className={styles.inputWrapper}>
			<label className={styles.label}>{label}</label>
			<input type="text" className={styles.textInput} placeholder={placeholder} disabled={disabled} />
			<span className={styles.errorMessage}>
				<Icon src={errorIcon} />
				<span>{message}</span>
			</span>
		</div>
	);
};
