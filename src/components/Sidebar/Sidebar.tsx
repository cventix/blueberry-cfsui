import * as React from "react";

// ui-elements
import { Hr } from "../ui-elements/Hr";

// internar component & styles
import { ActionNav } from "./components/ActionNav";
import { Nav } from "./components/Nav";
import "./Sidebar.scss";

export default interface Iprops {}

export const Sidebar = ({}: Iprops) => {
	const borderStyle = { 
		backgroundColor: '#f2f2f2',
		width:'100%',
		height: '2px' 
	};

	return (
		<aside className="sidebar">
			<div className="menuWrapper">
				<div className="menu">
					<ActionNav />
					<Hr style={borderStyle}/>
					<Nav />
				</div>
			</div>
		</aside>
	);
};