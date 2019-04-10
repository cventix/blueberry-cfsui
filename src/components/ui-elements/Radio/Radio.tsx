import * as React from "react";

// styles
import styles from "./Radio.module.scss";


export default interface Iprops {}

export const Radio = ({ }: Iprops) => (
	<label>
		<input type="radio" className={styles.radio}/>
	</label>
);