import * as React from "react";

// ui-elements
import { Hr } from "../ui-elements/Hr";
import { Button } from "../ui-elements/Button/Button";
import { Checkbox } from "../ui-elements/Checkbox/Checkbox";
import { Radio } from "../ui-elements/Radio/Radio";

// internar component & styles
import { ActionNav } from "./components/ActionNav";
import { Nav } from "./components/Nav";
import "./Sidebar.scss";

export default interface Iprops {}

export const Sidebar = ({}: Iprops) => {
	return (
		<aside className="sidebar">
			<div className="menuWrapper">
				<div className="menu">
					<Checkbox />
					<Radio />
					<ActionNav />
					<Hr />
					<Nav />
				</div>
			</div>
		</aside>
	);
};