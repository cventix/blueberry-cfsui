import * as React from 'react'

// ui-element
import { Icon } from "../Icon";
import { Button } from "../Button/Button";


//styles & icon
import cancelIcon from '../../../images/vmIcons/cancel.svg'
import styles from './Alert.module.scss'

export default interface Iprops {
	className?: string[]
	width?: number
	message?: string
	handleClose?: () => void
	hide?: boolean
	withClose?: boolean
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const Alert = ({ className, width, message, handleClose, hide, withClose }: Iprops) => (
	<div className={hide ? `${styles.alert} ${styles.hide}` : `${styles.alert} ${classCreator(className)}`} style={{width: width}}>
		<span>{message}</span>
		{withClose ? 
			<Button onClick={handleClose}>
				<Icon className={styles.closeIcon} src={cancelIcon} />
			</Button> : ''}
	</div>
)
