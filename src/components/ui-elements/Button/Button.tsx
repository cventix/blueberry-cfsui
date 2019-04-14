import * as React from "react";

// styles
import styles from "./Button.module.scss";

export default interface Iprops { 
	className?:  string[];
	onClick?: any;
	style?: object;
	children?: any;
}

const classCreator = (className: string[]) => {
	return className.map((name: string) => styles[name]).join(' ');
};

export const Button : React.FunctionComponent<Iprops> = props => {
	return (
		<button
		className={props.className ? `${styles.btn} ${classCreator(props.className)}` : `${styles.btn}`}
		onClick={props.onClick}
		style={props.style}
		>
			{props.children}
		</button>
	);
};
