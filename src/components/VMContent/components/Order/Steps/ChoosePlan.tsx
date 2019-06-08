import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'
import Card from './Card/Card'

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

const ChoosePlan: React.FunctionComponent<Iprops> = (props) => { 
	return (
		<div className={styles.choosePlan}>
			<ColorfulBox className={['red', 'lg']} withClose={true} message={t`طرحی انتخاب نکرده‌اید.`}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={props.currentStep} />
			</div>
			<StepDescription stepNumber={3} title={[t`مرحله سوم`, `:`, steps[2]].join(' ')} subTitle={t`کانفیگ سروری که قصد دارید آن را ایجاد کنید انتخاب کنید.`}/>
			<div className={styles.cardWrapper}>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>				
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
				<Card footerData={"۳۴۰,۰۰۰ ریال"} className={styles.choosePlanCard}>
					<div className={styles.planInfo}>
						<span className={styles.name}>VPS1</span>
						<p className={styles.trafic}>{t`ترافیک نامحدود`}</p>
						<ul className={styles.softwareInfo}>
							<li className={styles.row}>
								<span>{t`پردازنده`}: </span>
								<span>2 GHz  (1 Cores)</span>
							</li>
							<li className={styles.row}>
								<span>{t`حافظه`}: </span>
								<span>512 MB</span>
							</li>
							<li className={styles.row}>
								<span>{t`فضای دیسک`}: </span>
								<span>10 GB</span>
							</li>
						</ul>
					</div>
				</Card>
			</div>
			<Footer 
			nextStep={`vm/order/chooseNetwork`}
			previousStep={`vm/order/serviceDuration`}
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
)(ChoosePlan)

