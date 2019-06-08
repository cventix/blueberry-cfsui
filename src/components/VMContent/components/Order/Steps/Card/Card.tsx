import React, { FunctionComponent } from 'react'

// ui-elements
import { Icon } from '../../../../../../components/ui-elements/Icon'

// styles
import styles from './Card.module.scss'

export interface Iprops {
	icon?: string
	footerData: any
	children: any
	className?: string
	selected?: boolean
	withoutHover?: boolean
	active?: boolean
	onClickCard?: (e: any) => void
}

const Card: React.FunctionComponent<Iprops> = (props) => { 
	console.log( props.onClickCard)
	return (
		<div className={props.selected ? [`${styles.item}`, `${styles.selected}`, props.className].join(' ') :
			props.withoutHover || props.active ? [`${styles.item}`, `${styles.withoutHover}`,`${styles.active}`, props.className].join(' ') : 
			[`${styles.item}`, props.className].join(' ')} 
			onClick={()=> props.onClickCard && props.onClickCard(props.footerData)}
		>
			<div className={styles.top} >
				{props.children}
			</div>
			<footer className={styles.footer}>
				{props.footerData}
			</footer>
		</div>
	)
}

export default Card
