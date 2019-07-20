import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { Icon } from '../../../../../components/ui-elements/Icon'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'
import Card from './Card/Card'

// services
import { selectOs, goToNextStep, goToPreviousStep } from '../../../../../services/internal/store/actions'

// styles & icons
import threeMonthIcon from '../../../../../images/vmIcons/plansIcon/3-month.svg'
import sixMonthIcon from '../../../../../images/vmIcons/plansIcon/6-month.svg'
import monthlyIcon from '../../../../../images/vmIcons/plansIcon/monthly.svg'
import longIcon from '../../../../../images/vmIcons/plansIcon/long.svg'
import hpcIcon from '../../../../../images/vmIcons/plansIcon/hpc.svg'
import styles from '../Order.module.scss'

export interface Iprops {
	history?: object
	currentStep: number
	goToNextStep?: (e: any) => void
	goToPreviousStep?: (e: any) => void
}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

const ServiceDuration: React.FunctionComponent<Iprops> = (props) => { 
	//console.log(props.history)
	return (
		<div className={styles.serviceDuration}>
			<ColorfulBox className={['green', 'lg']} withClose={true} message={t`با خرید پلن روزانه، سرور شما هر روز به صورت خودکار تمدید می شود. هر گاه از تمدید منصرف شدید، می توانید سرور را حذف نمایید.`}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={props.currentStep} />
			</div>
			<StepDescription stepNumber={2} title={[t`مرحله دوم`,`:`, steps[1]].join(' ')} subTitle={t`مدت زمانی که قصد دارید سرویس برای شما فعال شود انتخاب کنید.`}/>
			<div className={styles.cardWrapper}>
				<Card footerData={t`ماهانه`}>
					<Icon src={monthlyIcon} />
				</Card>
				<Card footerData={t`سه ماهه`}>
					<Icon src={threeMonthIcon} />
				</Card>
				<Card footerData={t`شش ماهه`}>
					<Icon src={sixMonthIcon} />
				</Card>
				<Card footerData={t`یـکساله`}>
					<Icon src={longIcon} />
				</Card>
				<Card footerData={t`سفارشی (HPC)`}>
					<Icon src={hpcIcon} />
				</Card>
			</div>
			<Footer 
			nextStep={`vms/order/ChoosePlan`} 
			previousStep={`vms/order/SelectOs`} 
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
)(ServiceDuration)
