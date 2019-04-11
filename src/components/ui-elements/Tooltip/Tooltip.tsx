import * as React from "react";

// styles
import styles from "./Tooltip.module.scss";

export default interface Iprops {
	children: string;
}

export const Tooltip: React.FunctionComponent<Iprops> = props => {
	return <div className={styles.tooltip}>{props.children}</div>;
};
