import React, { FunctionComponent } from 'react'
import { t } from 'ttag'
import { Card } from './Card/Card'

import styles from './VMGrid.module.scss'

export default interface Iprops {
}

export const VMGrid: React.FunctionComponent<Iprops> = ({ }) => {
	return (
		<div className={styles.container}>
			<Card 
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			on={true} status={"198.143.181.40"}/>
			<Card 
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			payment={true} status={t`۱,۷۳۳,۱۰۰ ریال`}/>
			<Card
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			invoice={true} status={t`بدلیل عدم پرداخت لغو شد`}/>
			<Card 
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			turningOff={true} status={t`198.143.181.40`}/>
			<Card 
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			create={true} status={t`پرداخت شده`}/>
			<Card 
			os="CentOs6.7"
			cpu="8GHz (4core)"
			disk="8GB"
			ram="10GB"
			defined={true} status={t`198.143.180.139`}/>
			<Card purchase={true}/>
		</div>
	)
}
