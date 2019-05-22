import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { TextInput } from '../../../../../components/ui-elements/Input/Input'
import { Button } from '../../../../../components/ui-elements/Button/Button'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'

// styles
import styles from '../Order.module.scss'

export default interface Iprops {}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const FinalStep: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.FinalStep}>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={4} />
			</div>
			<StepDescription stepNumber={5} title={[t`مرحله پنجم: `, steps[4]].join(' ')} subTitle={t`نام سرور خود را انتحاب کنید`}/>
			<ColorfulBox className={['white', 'lg']} margin={"0 0 30px 0"}>
				<div className={styles.serverName}>
					<span className={styles.title}>{t`نام سرور را وارد کنید`}:</span>
					<p className={styles.description}>{t`نام سرور باید انگلیسی و تنها شامل حرف، عدد و خط تیره باشد.`}</p>
					<TextInput/>
				</div>
			</ColorfulBox>
			<ColorfulBox className={['green', 'lg']} margin={"0 0 124px 0"}>
				<div className={styles.discount}>
					<span className={styles.title}>{t`کد تخفیف را وارد کنید`}:</span>
					<p className={styles.description}>{t`در صورتیکه کد تخفیف دارید آن را جهت بررسی و اعمال وارد کنید.`}</p>
					<TextInput style={{ display: 'inline-block'}}/>
					<Button className={['btnDefault0', 'btnSm']}>{t`بررسی`}</Button>
				</div>
			</ColorfulBox>
			<Footer finalStep={true}/>
		</div>
	)
}
