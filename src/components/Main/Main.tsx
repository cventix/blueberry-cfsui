import * as React from "react";
import styles from "./Main.module.scss";

export default interface Iprops {
  text: string;
}

export const Main = ({ text }: Iprops) => {
	return (
		<section className={styles.main}></section>
	);
};