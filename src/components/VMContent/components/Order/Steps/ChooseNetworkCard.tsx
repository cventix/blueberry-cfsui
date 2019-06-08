import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { Hr } from '../../../../../components/ui-elements/Hr'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'

// services
import { selectOs, goToNextStep, goToPreviousStep } from '../../../../../services/internal/store/actions'

// styles
import styles from '../Order.module.scss'

export interface Iprops {
	currentStep: number
	goToNextStep?: (e: any) => void
	goToPreviousStep?: (e: any) => void
}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

const ChooseNetworkCard: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<div className={styles.chooseNetworkCard}>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={props.currentStep} />
			</div>
			<StepDescription stepNumber={4} title={[t`مرحله چهارم`, `:`, steps[3]].join(' ')} subTitle={t`اطلاعات کارت شبکه شما در زیر نمایش داده شده است.`}/>
			<div className={styles.wrapper}>
				<ColorfulBox className={['white', 'lg']} fontSize={14}>
					<div className="networkInfo">
						<div className="header">
							<div>{t`نام شبکه`}</div>
							<div>{t`تعداد IP`}</div>
						</div>
						<Hr backgroundColor={'#e5e5e5'} height={'1px'}/>
						<div className="body">
							<div>Internet180_0</div>
							<div>1</div>
						</div>
					</div>
				</ColorfulBox>
			</div>
			<Footer
			nextStep={`vm/order/finalStep`}
			previousStep={`vm/order/choosePlan`}
			handleNextStep={props.goToNextStep}
			handlePreviousStep={props.goToPreviousStep}
			/>
		</div>
	)
}

const mapStateToProps = (state: any) => ({
	currentStep: state.vm.currentStep
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    goToNextStep: (stepNumber: number) => dispatch(goToNextStep(stepNumber)),
    goToPreviousStep: (stepNumber: number) => dispatch(goToPreviousStep(stepNumber))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseNetworkCard)
