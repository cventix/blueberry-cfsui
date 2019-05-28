import React from 'react'
import { Link } from 'react-router-dom'
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
			<Link to='/' className={lng == 'en' ? `${styles.item} ${styles.active}` : styles.item} onClick={setLocale('en')}>EN</Link>
			<Link to='/' className={lng == 'fa' ? `${styles.item} ${styles.active}` : styles.item} onClick={setLocale('fa')}>FA</Link>
		</div>
	)
}
