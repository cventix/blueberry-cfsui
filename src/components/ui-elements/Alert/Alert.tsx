import * as React from 'react'

//styles & icon
import cancelIcon from '../../../images/vmIcons/cancel.svg'
import styles from './Alert.module.scss'

export default interface Iprops {
	className?: string[]
	width?: number
	message?: string
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const Alert = ({ className, width, message }: Iprops) => (
	<div className={className ? `${styles.alert} ${classCreator(className)}` : `${styles.alert}`} style={{width: width}}>
		<span>{message}</span>
		<img src={cancelIcon} onClick={() => {}}/>
	</div>
)
