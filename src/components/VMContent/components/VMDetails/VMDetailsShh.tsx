import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// internal-component
import { Card } from '../../../VMGrid/Card/Card'

// styles
import styles from './VMDetails.module.scss'

export default interface Iprops {}

export const VMDetailsShh: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.VMDetails}>
			<Card 
				fullScreen={true}
				Extended={true}
				showDetails={true}
				os="CentOs6.7"
				cpu="8GHz (4core)"
				disk="8GB"
				ram="10GB"
				on={true} status={"198.143.181.40"}
			>
			<div className={styles.wrapper}>
				<div className={styles.title}>{t`اتصال به سرور از طریق SSH`}</div>
				<code className={styles.codeWrapper}>$ ssh root@198.143.181.40</code>
				<div className={styles.hint}>{t`* رمز عبور به ایمیل شما فرستاده شده است.`}</div>
			</div>
			</Card>
		</div>
	)
}
