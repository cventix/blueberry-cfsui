import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom';
import { t } from "ttag";

// ui-elements
import { Button } from "../../../../../../components/ui-elements/Button/Button";
import { IconLink } from '../../../../../../components/ui-elements/IconLink'

// internal-component
import { VmInfo } from './VmInfo'

// styles & icons
import arrowLeftGrayIcon from '../../../../../../images/arrow-left-darkGray.svg'
import arrowLeftIcon from '../../../../../../images/arrow-left-white.svg'
import invoiceIcon from '../../../../../../images/invoice.svg'
import styles from './Footer.module.scss'

export default interface Iprops {
	nextStep?: string
	previousStep?: string
	finalStep?: boolean
	hide?: boolean
	firstStep?: boolean
	history?: any
	handlePreviousStep?: (e: number) => void
	handleNextStep?: (e: number) => void
}

export const Footer: React.FunctionComponent<Iprops> = (props) => { 
	console.log(props.handleNextStep)
	return (
		<footer className={styles.footer}>
			<div className={styles.btnWrapper}>
				<div className={styles.right}
					onClick={() => props.handlePreviousStep && props.handlePreviousStep(0)}>
					<Link to={`/${props.previousStep}`} className={props.firstStep ? 'hide' : ''}>
						<Button 
							className={['btnSm']} 
							style={{boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)', border: 'solid 1px #979797'}}
							>
							<IconLink icon={arrowLeftGrayIcon} label={t`قبـلی`}/>
						</Button>
					</Link>
					<Link to="/vm">
						<Button className={['btnDefault0', 'btnSm']}>{t`انصراف`}</Button>
					</Link>
				</div>
				<div className={styles.left}>
					<div className={props.finalStep ? styles.largBtn : styles.wrapper} 
						onClick={() => props.handleNextStep && props.handleNextStep(0)}>
						<Link to={`/${props.nextStep}`} >
							 <Button className={['btnPrimary0', 'btnSm']} style={props.finalStep ? {width: '159px', direction: 'rtl'} : {}}>
								{props.finalStep ? <IconLink icon={invoiceIcon} label={t`صدور صورتحساب`}/> : <IconLink icon={arrowLeftIcon} label={t`بعدی`}/>}
							 </Button>
						</Link>
					</div>
				</div>
			</div>
			<div className={styles.infoWrapper}>
				<VmInfo hide={props.hide}/>
			</div>
		</footer>
	)
}
