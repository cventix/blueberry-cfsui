import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { RangeBar } from '../../../../../components/ui-elements/Rangebar/Rangebar'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'

// styles
import styles from '../Order.module.scss'

export default interface Iprops {}
export interface STBprops {
	name: string
	info: string
	basePrice: string
	minService: string
}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب تنظیمات سفارشی`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const DailySetting: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.dailySetting}>

			<ColorfulBox className={['blue', 'lg']} withClose={true} message={t`CentOS 7.3 (64bit): CPU: 4 Cores, RAM: 8 GB, DISK: 80 GB حداقل انتخاب برای سرویس روزانه: `}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={2} />
			</div>
			<StepDescription stepNumber={3} title={[t`مرحله سوم: `, steps[2]].join(' ')} subTitle={t`می‌توانید مشخصات سرور را نسبت به نیاز روزانه خود انتخاب نمایید.`}/>
				<SettingBox name={'CPU'} info={'4 core'} basePrice={'۱,۰۰۰ ریال'} minService={'1 core'}/>
				<SettingBox name={'RAM'} info={'8 GB'} basePrice={'۱,۰۰۰ ریال'} minService={'1 GB'}/>
				<SettingBox name={'DISK'} info={'30 GB'} basePrice={'۱,۰۰۰ ریال'} minService={'10 GB'}/>
			<Footer/>
		</div>
	)
}

export const SettingBox: React.FunctionComponent<STBprops> = (props) => (
	<div className={styles.settingBox}>
		<div className={styles.left}>
			<span>{props.basePrice}</span>= 
			<span>{props.minService}</span>
		</div>
		<div className={styles.center}>
			<RangeBar width={400}/>
		</div>
		<div className={styles.right}>
			<div className={styles.name}>{props.name}</div>
			<div className={styles.info}>{props.info}</div>
		</div>
	</div>
)