import * as React from "react";
import styles from "./Sidebar.module.scss";

interface Iprops {
  text: string;
}

const Sidebar: React.FunctionComponent<Iprops> = props => {
	return (
		<aside></aside>
	);
};

export default Sidebar;
