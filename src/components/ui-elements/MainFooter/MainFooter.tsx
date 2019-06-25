import React from 'react';
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

// styles
import styles from './MainFooter.module.scss'

export default interface Iprops {}

export const MainFooter: React.FunctionComponent<Iprops> = () => (
	<footer className={`pg-absolute pg-inset-x-0 pg-bottom-10p pg-text-center pg-text-xs mobile:pg-relative mobile:pg-mt-30p ${styles.mainFooter}`}>
		<div className="pg-text-gray-600">Powered by <a className="pg-text-blue-400 pg-font-vMedium">PersianGig</a> IaaS Cloud Platform</div>
		<div className={`pg-absolute pg-left-0 pg-left-30p pg-bottom-2p mobile:pg-relative mobile:pg-left-0 mobile:pg-mt-5p ${styles.switcher}`}>
			<LangSwitcher />
		</div>
	</footer>
)