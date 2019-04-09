import * as React from "react";
import styles from "./Sidebar.module.scss";

export default interface Iprops {
  text: string;
}

export const Sidebar = ({ text }: Iprops) => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.menuWrapper}></div>
		</aside>
	);
};