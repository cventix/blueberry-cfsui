import React from 'react';
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

// styles
import styles from './MainFooter.module.scss'

export default interface Iprops {}

export const MainFooter: React.FunctionComponent<Iprops> = () => (
	<footer className={styles.mainFooter}>
		<div className={styles.copyRight}>Powered by <a>PersianGig</a> IaaS Cloud Platform</div>
		<div className={styles.switcher}>
			<LangSwitcher />
		</div>
	</footer>
)