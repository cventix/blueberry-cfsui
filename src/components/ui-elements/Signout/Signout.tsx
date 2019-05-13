import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../IconLink'

// styles & icons
import profile from '../../../images/profileIcons/profile.svg'
import signout from '../../../images/signout.svg'
import styles from './Signout.module.scss'

export default interface Iprops {
	username: string;
}

export const Signout : React.FunctionComponent<Iprops> = ({ username })=>{
	return (
		<ul className={styles.signout}>
			<li>
				<span>{username}</span>
			</li>
			<li className={styles.item}>
				<IconLink icon={profile} iconAlt="profile" label={t`حساب کاربری`}/>
			</li>
			<li className={styles.item}>
				<IconLink icon={signout} iconAlt="logout"  label={t`خروج`}/>
			</li>
		</ul>
	)
}