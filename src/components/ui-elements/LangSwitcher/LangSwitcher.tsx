import React from 'react'
import { t } from 'ttag'
import { saveLocale, getLocale } from '../../../translate/translate'

// styles
import styles from './LangSwitcher.module.scss'

const lng = getLocale() || 'fa'; 
const setLocale = (locale: string) => () => {
	saveLocale(locale);
	window.location.reload();
}

export const LangSwitcher = () => {
	return (
		<div className={styles.langSwitch}>
			<a href='/' className={lng == 'en' ? `${styles.item} ${styles.active}` : styles.item} onClick={setLocale('en')}>EN</a>
			<a href='/' className={lng == 'fa' ? `${styles.item} ${styles.active}` : styles.item} onClick={setLocale('fa')}>FA</a>
		</div>
	)
}
