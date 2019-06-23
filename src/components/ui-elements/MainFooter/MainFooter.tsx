import React from 'react';
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

// styles
import styles from './MainFooter.module.scss'

export default interface Iprops {}

export const MainFooter: React.FunctionComponent<Iprops> = () => (
	<footer className={`pg-absolute pg-inset-x-0 pg-text-center ${styles.mainFooter}`}>
		<div>Powered by <a className="pg-text-blue-400 pg-font-vMedium">PersianGig</a> IaaS Cloud Platform</div>
		<div className={`pg-absolute mobile:pg-relative pg-left-0 ${styles.switcher}`}>
			<LangSwitcher />
		</div>
	</footer>
)