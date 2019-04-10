import * as React from "react";

// styles
import styles from "./Checkbox.module.scss";


export default interface Iprops {}

export const Checkbox = ({ }: Iprops) => (
	<label>
		<input type="text" className={styles.checkbox} disabled/>
	</label>
);
