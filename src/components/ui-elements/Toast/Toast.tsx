import * as React from "react";

// styles
import styles from "./Toast.module.scss";

export default interface Iprops {
	children: string;
	error?: boolean;
	success?: boolean;
	width?: number;
}

export const Toast: React.FunctionComponent<Iprops> = props => {
	return <div 
	className={props.success ? `${styles.toast} ${styles.success}` : `${styles.toast} ${styles.error}`}
	style={{ width: props.width }}
	>
		{props.children}
	</div>;
};