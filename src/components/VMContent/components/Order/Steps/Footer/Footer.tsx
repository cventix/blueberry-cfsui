import React, { FunctionComponent } from 'react'
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
	handleNextStep?: () => void
	handleCancelBtn?: () => void
	handlePreviousStep?: () => void
	finalStep?: boolean
	hide?: boolean
}

export const Footer: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<footer className={styles.footer}>
			<div className={styles.btnWrapper}>
				<div className={styles.right}>
					<Button 
						className={['btnSm']} 
						style={{boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.15)', border: 'solid 1px #979797'}}
						onClick={props.handlePreviousStep}
						>
						<IconLink icon={arrowLeftGrayIcon} label={t`قبـلی`}/>
					</Button>
					<Button className={['btnDefault0', 'btnSm']} onClick={props.handleCancelBtn}>{t`انصراف`}</Button>
				</div>
				<div className={styles.left}>
					<Button className={['btnPrimary0', 'btnSm']} onClick={props.handleNextStep} style={props.finalStep ? {width: '159px', direction: 'rtl'} : {}}>
						{props.finalStep ? <IconLink icon={invoiceIcon} label={t`صدور صورتحساب`}/> : <IconLink icon={arrowLeftIcon} label={t`بعدی`}/>}
					</Button>
				</div>
			</div>
			<div className={styles.infoWrapper}>
				<VmInfo hide={props.hide}/>
			</div>
		</footer>
	)
}
