// TODO: if has notification add hasNotif classname
// TODO: current page has current classname

import * as React from "react"

// ui-elements
import { Icon } from "../ui-elements/Icon";
import { IconLink } from "../ui-elements/IconLink";
import { Avatar } from "../ui-elements/Avatar";

// icons
import logo from "../../images/pg-logo.svg";
import fileCloudIcn from "../../images/navbarIcons/file-cloud.svg";
import vpsIcn from "../../images/navbarIcons/vps.svg";
import internetIcn from "../../images/navbarIcons/internet.svg";
import statusIcn from "../../images/navbarIcons/status.svg";
import financeIcn from "../../images/navbarIcons/finance.svg";
import notifIcn from "../../images/navbarIcons/notif.svg";

// styles
import "./Navbar.scss";

export default interface Iprops {}

export const Navbar = ({ }: Iprops) => {
	const altIcn = 'Icon';
	return (
		<div className="navbar">
			<div className="right">
				<a href="/" className="logoWrapper"> 
					<Icon src={logo} className="logo" alt="pg-logo"/>
				</a>
				<div className="nav">
					<IconLink icon={fileCloudIcn} className="iconLink current" iconAlt={`File-cloud ${altIcn}`} label="میزبانی‌فایل"/>
					<IconLink icon={vpsIcn} iconAlt={`vps ${altIcn}`} label="سرور و هاست"/>
					<IconLink icon={internetIcn} iconAlt={`Internet ${altIcn}`} label="اینترنت"/>
				</div>
			</div>
			<div className="left">
				<div className="nav">
					<IconLink icon={notifIcn} className="iconLink webIcn hasNotif" iconAlt={`Notif ${altIcn}`}/>
					<IconLink icon={financeIcn} className="iconLink webIcn" iconAlt={`Finance ${altIcn}`}/>
					<IconLink icon={statusIcn} className="iconLink status" iconAlt={`Status ${altIcn}`}/>
					<Avatar/>
				</div>
			</div>
		</div>
	);
};
