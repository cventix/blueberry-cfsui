import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// styles
import styles from '../Order.module.scss'

export default interface Iprops {
	stepNumber: number
	title: string
	subTitle: string
}

export const StepDescription: React.FunctionComponent<Iprops> = ({ stepNumber, title, subTitle }) => { 
	return (
		<div className={styles.stepDescription}>
			<div className={styles.number}>{stepNumber}</div>
			<div className={styles.text}>
				<div className={styles.title}>{title}</div>
				<div className={styles.subTitle}>{subTitle}</div>
			</div>
		</div>
	)
}
