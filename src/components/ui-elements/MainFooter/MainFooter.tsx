import React from 'react';
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

// styles
import styles from './MainFooter.module.scss'

export default interface Iprops {}

export const MainFooter: React.FunctionComponent<Iprops> = () => (
	<div className={styles.mainFooter}>
		<footer >Powered by <a>PersianGig</a> IaaS Cloud Platform</footer>
		<div className={styles.switcher}>
			<LangSwitcher />
		</div>
	</div>
)