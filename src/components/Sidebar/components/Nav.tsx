import * as React from "react";

// ui-elements
import { IconLink } from "../../ui-elements/IconLink";

// icons
import fileCloudIcn from "../../../images/navbarIcons/file-cloud.svg";
import vpsIcn from "../../../images/navbarIcons/vps.svg";
import internetIcn from "../../../images/navbarIcons/internet.svg";
import notifIcn from "../../../images/navbarIcons/notif.svg";
import financeIcn from "../../../images/navbarIcons/finance.svg";

export const Nav = () => {
	const altIcn = 'Icon';
	return (
		<div className="nav">
			<IconLink icon={fileCloudIcn} iconAlt={`content-delivery ${altIcn}`} label="شبکه تحویل محتوا"/>
			<IconLink icon={vpsIcn} iconAlt={`vps ${altIcn}`} label="سرور و هاست"/>
			<IconLink icon={internetIcn} iconAlt={`Internet ${altIcn}`} label="اینترنت"/>
			<IconLink icon={notifIcn} iconAlt={`notif ${altIcn}`} label="تیکت‌ها"/>
			<IconLink icon={financeIcn} iconAlt={`finance ${altIcn}`} label="فاکتورها"/>
		</div>
	);
}

