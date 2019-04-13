import * as React from "react";

// styles
import styles from "./Checkbox.module.scss";

export default interface Iprops {
	disabled?: boolean;
	className?: string;
}

const createClassName = (className: string) => {
	if (className == null)
		className = `${styles.checkbox}`;

	if (className === 'indeterminate')
		className = `${styles.checkbox} ${styles.indeterminate}`;
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
