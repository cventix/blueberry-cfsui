import * as React from "react";

// ui-elements
import { Hr } from "../ui-elements/Hr";
import { Button } from "../ui-elements/Button/Button";

// icons
import uploadInc from "../../images/upload.svg";
import upFromUrlInc from "../../images/sidebarIcons/upfromurl.svg";

// internal components & styles
import { ActionNav } from "./components/ActionNav";
import { UpgradeAccount } from "./components/UpgradeAccount/UpgradeAccount";
import { Nav } from "./components/Nav";
import { IconLink } from "../ui-elements/IconLink";
import "./Sidebar.scss";

export default interface Iprops {}

export const Sidebar = ({}: Iprops) => {
	return (
		<aside className="sidebar">
			<div className="menuWrapper">
				<div className="menu">
					<Button 
					className={["btnPrimary0", "btnLg"]} 
					style={{marginBottom: '15px'}}>
						<IconLink icon={uploadInc} iconAlt="upload icon" label="آپلود فایل"/>
					</Button>
					<IconLink icon={upFromUrlInc} className="iconLink upFromUrl" iconAlt="upload icon" label="آپلود فایل از URL"/>
					<ActionNav />
					<Hr />
					<UpgradeAccount />
					<Hr />
					<Nav />
				</div>
			</div>
		</aside>
	);
};