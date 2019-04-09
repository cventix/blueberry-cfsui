import * as React from "react";

// ui-elements
import { IconLink } from "../../ui-elements/IconLink";

// icons
import newFolderIcn from "../../../images/sidebarIcons/newfolder.svg";
import moveIcn from "../../../images/sidebarIcons/move.svg";
import deleteIcn from "../../../images/sidebarIcons/delete.svg";

export const ActionNav = () => {
	const altIcn = 'Icon';
	return (
		<div className="actionNav">
			<IconLink icon={newFolderIcn} iconAlt={`new-folder ${altIcn}`} label="پوشه جدید"/>
			<IconLink icon={moveIcn} iconAlt={`move ${altIcn}`} label="انتقال"/>
			<IconLink icon={deleteIcn} iconAlt={`delete ${altIcn}`} label="حذف"/>
		</div>
	);
}

