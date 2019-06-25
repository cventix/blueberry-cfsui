import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { TextInput } from '../../../../../components/ui-elements/Input/Input'
import { Button } from '../../../../../components/ui-elements/Button/Button'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'

// services
import { selectOs, goToPreviousStep } from '../../../../../services/internal/store/actions'

// styles
import styles from '../Order.module.scss'

export interface Iprops {
	currentStep: number
	goToPreviousStep?: (e: any) => void
}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

const FinalStep: React.FunctionComponent<Iprops> = (props) => {
	return (
		<div className={styles.FinalStep}>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={props.currentStep} />
			</div>
			<StepDescription stepNumber={5} title={[t`مرحله پنجم`, `:`, steps[4]].join(' ')} subTitle={t`نام سرور خود را انتحاب کنید`}/>
			<ColorfulBox className={['white', 'lg']} margin={"0 0 30px 0"}>
				<div className={styles.serverName}>
					<span className={styles.caption}>{t`نام سرور را وارد کنید`}:</span>
					<p className={styles.dscp}>{t`نام سرور باید انگلیسی و تنها شامل حرف، عدد و خط تیره باشد.`}</p>
					<TextInput/>
				</div>
			</ColorfulBox>
			<div className={styles.wrapper}>
				<ColorfulBox className={['green', 'lg']}>
					<div className={styles.discount}>
						<span className={styles.caption}>{t`کد تخفیف را وارد کنید`}:</span>
						<p className={styles.dscp}>{t`در صورتیکه کد تخفیف دارید آن را جهت بررسی و اعمال وارد کنید.`}</p>
						<TextInput style={{ display: 'inline-block'}}/>
						<Button className={['pg-btnDefault0', 'pg-btnSm']}>{t`بررسی`}</Button>
					</div>
				</ColorfulBox>
			</div>
			<Footer 
			finalStep={true}
			previousStep={`vm/order/chooseNetwork`}
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
    goToPreviousStep: (stepNumber: number) => dispatch(goToPreviousStep(stepNumber))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalStep)
