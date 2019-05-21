import React, { FunctionComponent } from 'react'

// ui-elements
import { Icon } from '../../../../../../components/ui-elements/Icon'

// styles
import styles from './Card.module.scss'

export default interface Iprops {
	icon?: string
	footerData: string
	children: any
}

export const Card: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<div className={styles.item}>
			<div className={styles.top} >
				{props.children}
			</div>
			<footer className={styles.footer}>
				{props.footerData}
			</footer>
		</div>
	)
}
