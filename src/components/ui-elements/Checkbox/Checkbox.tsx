import * as React from "react";

// styles
import styles from "./Checkbox.module.scss";

export default interface Iprops {
	disabled?: boolean;
	className?: string;
}

const createClassName = (className?: string) => {
	if (className == null)
		className = `${styles.checkbox}`;

	if (className === 'selected')
		className = `${styles.checkbox} ${styles.selected}`;
	if (className === 'selected dis')
		className = `${styles.checkbox} ${styles.dis}`;
	return className;
}

export const Checkbox = ({ disabled = false, className }: Iprops) => {
	return (
		<label className = {disabled ? `${styles.checkbox} ${styles.disabled}` : createClassName(className)}>
			<input type="checkbox" disabled={disabled}/>
			<span className={styles.checkmark}></span>
		</label>
	);
};
