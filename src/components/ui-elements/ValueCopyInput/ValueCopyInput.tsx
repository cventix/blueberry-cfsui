// TODO copy to clipboard in onclick
// TODO when copied add done class to span

import * as React from "react";

// ui-elements
import { TextInput } from "../Input/Input";
import { Button } from "../Button/Button";

// styles
import styles from "./ValueCopyInput.module.scss";

export default interface Iprops { 
	onClick: ()=>void;
}

export const ValueCopyInput = ({ onClick }: Iprops) => {
	return (
		<div className={styles.valueCopyInput}>
			<TextInput placeholder="http://cdn.persiangig.com/..." />
			<Button onClick={onClick}>
				<span className={styles.copy}>کپی کن</span>
			</Button>
		</div>
	);
};