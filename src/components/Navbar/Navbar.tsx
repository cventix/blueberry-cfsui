import * as React from "react"

// ui-elements
import Icon from "../ui-elements/Icon";

// img
import logo from "../../images/pg-logo.svg";
import fileCloudIcn from "../../images/navbarIcons/file-cloud.svg";
import vpsIcn from "../../images/navbarIcons/vps.svg";
import internetIcn from "../../images/navbarIcons/internet.svg";
import avatarIcn from "../../images/navbarIcons/avatar.svg";
import statusIcn from "../../images/navbarIcons/status.svg";
import financeIcn from "../../images/navbarIcons/finance.svg";
import notifIcn from "../../images/navbarIcons/notif.svg";

// style
import styles from "./Navbar.module.scss";

interface Iprops {
	text: string;
}

const Navbar = ({ text }: Iprops) => {
	const altIcn = 'icon';
	return (
		<div className={styles.navbar}>
			<div className={styles.right}>
				<a href="/" className={styles.logoWrapper}> 
					<Icon src={logo} className={styles.logo} alt="pg-logo"/>
				</a>
				<ul className={styles.nav}>
					<li>
						<img src={fileCloudIcn} className={styles.icon} alt={`file-cloud ${altIcn}`}/>
						<span className={styles.label}>میزبانی‌فایل</span>
					</li>
					<li>
						<img src={vpsIcn} className={styles.icon} alt={`vps ${altIcn}`}/>
						<span className={styles.label}>سرور و هاست</span>
					</li>
					<li>
						<img src={internetIcn} className={styles.icon} alt={`internet ${altIcn}`}/>
						<span className={styles.label}>اینترنت</span>
					</li>
				</ul>
			</div>
			<div className={styles.left}>
				<ul className={styles.nav}>
					<li>
						<Icon src={avatarIcn} className={`${styles.avatar} ${styles.forRsp}`} alt="avatar image"/>
					</li>
					<li className={styles.status}>
						<Icon src={statusIcn}  className={`${styles.icon} ${styles.forRsp}`} alt={`status ${altIcn}`}/>
					</li>
					<li>
						<Icon src={financeIcn} className={`${styles.icon} ${styles.webIcn}`} alt={`finance ${altIcn}`}/>
					</li>
					<li>
						<Icon src={notifIcn} className={`${styles.icon} ${styles.webIcn}`} alt={`notif ${altIcn}`}/>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
