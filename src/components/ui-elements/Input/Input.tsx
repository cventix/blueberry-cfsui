import * as React from "react";

// styles
import styles from "./Input.module.scss";

export default interface Iprops { 
	placeholder: string;
}

export const Input = ({ placeholder }: Iprops) => {
	return (
		<input type="text" className={styles.textInput} placeholder={placeholder} />
	);
};
