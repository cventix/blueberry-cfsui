import React from 'react'
import { t } from 'ttag'
import { saveLocale } from '../../../translate/translate'

// styles
import styles from './LangSwitcher.module.scss'

export default interface Iprops {
	isActive?: boolean
	onClick?: (lang: string) => void
}

const setLocale = (locale: string) => () => {
	saveLocale(locale);
	window.location.reload();
}

export const LangSwitcher = ({ onClick }: Iprops) => {
	return (
	<div className={styles.langSwitch}>
		<a href='/' className={styles.item} onClick={setLocale('en')}>EN</a>
		<a href='/' className={`${styles.item} ${styles.active}`} onClick={setLocale('fa')}>FA</a>
	</div>
	)
}
