import * as React from "react";
import logo from "../../images/pg-logo.svg";
import fileCloudIcn from "../../images/navbarIcons/file-cloud.svg";
import vpsIcn from "../../images/navbarIcons/vps.svg";
import internetIcn from "../../images/navbarIcons/internet.svg";
import avatarIcn from "../../images/navbarIcons/avatar.svg";
import statusIcn from "../../images/navbarIcons/status.svg";
import financeIcn from "../../images/navbarIcons/finance.svg";
import notifIcn from "../../images/navbarIcons/notif.svg";
import styles from "./Navbar.module.scss";

interface NBprops {
	text: string;
}

const Navbar: React.FunctionComponent<NBprops> = props => {
	return (
		<div className={styles.navbar}>
			<div className={styles.right}>
				<div className={styles.logoWrapper}> 
					<img src={logo} className={styles.logo} alt="pg-logo" />
				</div>
				<ul className={styles.nav}>
					<li>
						<img src={fileCloudIcn} className={styles.icon} alt="file-cloud icon"/>
						<span className={styles.label}>میزبانی‌فایل</span>
					</li>
					<li>
						<img src={vpsIcn} className={styles.icon} alt="vps icon"/>
						<span className={styles.label}>سرور و هاست</span>
					</li>
					<li>
						<img src={internetIcn} className={styles.icon} alt="internet icon"/>
						<span className={styles.label}>اینترنت</span>
					</li>
				</ul>
			</div>
			<div className={styles.left}>
				<ul className={styles.nav}>
					<li>
						<img src={avatarIcn} className={`${styles.avatar} ${styles.forRsp}`} alt="avatar image"/>
					</li>
					<li className={styles.status}>
						<img src={statusIcn}  className={`${styles.icon} ${styles.forRsp}`} alt="status icon"/>
					</li>
					<li>
						<img src={financeIcn} className={`${styles.icon} ${styles.webIcn}`} alt="finance icon"/>
					</li>
					<li>
						<img src={notifIcn} className={`${styles.icon} ${styles.webIcn}`} alt="avatar icon"/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
