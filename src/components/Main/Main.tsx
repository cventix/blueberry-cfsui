import * as React from "react";

// styles
import styles from "./Main.module.scss";

export default interface Iprops { 
	children?: any;
}

export const Main : React.FunctionComponent<Iprops> = props => {
	return (
		<section className={styles.main}>{props.children}</section>
	);
};