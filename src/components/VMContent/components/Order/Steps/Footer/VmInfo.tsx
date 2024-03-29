import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../../components/ui-elements/ColorfulBox/ColorfulBox'

// styles
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
	hide?: boolean
}

export const VmInfo: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<ColorfulBox className={['blue', 'lg']} fontSize={14} hide={props.hide}>
			<div className={styles.info}>
				<div className={styles.item}>
					<ul>
						<li>{t`سیستم عامل`}: <span className={styles.value}>{props.os}</span></li>
						<li>{t`هزینه سرویس`}: <span className={styles.value}>{props.price}</span></li>
					</ul>
				</div>
				<div className={styles.item}>
					<ul>
						<li>{t`پردازنده`}: <span className={styles.value}>{props.cpu}</span></li>
						<li>{t`تخفیف سایت`}: <span className={styles.value}>{props.discount}</span></li>
					</ul>
				</div>
				<div className={styles.item}>
					<ul>
						<li>{t`حافظه`}: <span className={styles.value}>{props.ram}</span></li>
						<li>{t`تخفیف کد تخفیف`}: <span className={styles.value}>{props.discountCode}</span></li>
					</ul>
				</div>
				<div className={styles.item}>
					<ul>
						<li>{t`فضای دیسک`}: <span className={styles.value}>{props.disk}</span></li>
					</ul>
				</div>
				<div className={styles.item}>
					<ul>
						<li>{t`مدت سرویس`}: <span className={styles.value}>{props.serviceDuration}</span></li>
						<li><span className={styles.value}>{t`کل هزینه`}: </span><span className={styles.value}>{props.totalPrice}</span></li>
					</ul>
				</div>
			</div>
		</ColorfulBox>
	)
}
