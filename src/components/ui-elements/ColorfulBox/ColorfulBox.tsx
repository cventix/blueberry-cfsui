import * as React from 'react'

// ui-element
import { Icon } from "../Icon";
import { Button } from "../Button/Button";


//styles & icon
import cancelIcon from '../../../images/vmIcons/cancel.svg'
import styles from './ColorfulBox.module.scss'

export default interface Iprops {
	className?: string[]
	width?: number
	fontSize?: number
	height?: number
	margin?: string
	message?: string
	handleClose?: () => void
	hide?: boolean
	withClose?: boolean
	children?: any
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const ColorfulBox = ({ className, width, fontSize, height, margin, message, handleClose, hide, withClose, children }: Iprops) => (
	<div 
	className={hide ? `${styles.colorfulBox} ${styles.hide}` : `${styles.colorfulBox} ${classCreator(className)}`} 
	style={{width: width, margin: margin, height: height, fontSize: fontSize}}>
		<div className={styles.message}>{message}</div>
		{withClose ? 
			<a onClick={handleClose} className={styles.close}>
				<Icon className={styles.closeIcon} src={cancelIcon} />
			</a> : ''}
		{children}
	</div>
)
