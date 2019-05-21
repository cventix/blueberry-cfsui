import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import styles from './Footer.module.scss'

export default interface Iprops {
	os?: string
	price?: string
	totalPrice?: string
	serviceDuration?: string
	disk?: string
	ram?: string
	cpu?: string
	discount?: string
	discountCode?: string
}

export const VmInfo: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<div className={styles.info}>
			<div>
				<ul>
					<li>{t`سیستم عامل`}: {props.os}</li>
					<li>{t`هزینه سرویس`}: {props.price}</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>{t`پردازنده`}: {props.cpu}</li>
					<li>{t`تخفیف سایت`}: {props.discount}</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>{t`حافظه`}: {props.ram}</li>
					<li>{t`تخفیف کد تخفیف`}: {props.discountCode}</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>{t`فضای دیسک`}: {props.disk}</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>{t`مدت سرویس`}: {props.serviceDuration}</li>
					<li>{t`کل هزینه`}: {props.totalPrice}</li>
				</ul>
			</div>
		</div>
	)
}
