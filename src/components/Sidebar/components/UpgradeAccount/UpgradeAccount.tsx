import * as React from "react";

// ui-elements
import { IconLink } from "../../../ui-elements/IconLink";

// icons
import arrowLeftIcn from "../../../../images/arrow-left.svg";

// styles
import styles from "./UpgradeAccount.module.scss";

export default interface Iprops {
	percent?: number;
}

export const UpgradeAccount = ({ percent = 70 }: Iprops) => {
	return (
		<div className={styles.upgradeAccount}>
			<div className={styles.percent}>٪{`${percent}`} از حجم شما استفاده شده</div>
			<span className={styles.deleteQus}>می‌خواهید فایل‌هایتان حذف نشود؟</span>
			<IconLink icon={arrowLeftIcn} className={styles.bottom} iconAlt="arrow-left" label="ارتقاء حساب میزبانی"/>
		</div>
	);
}

