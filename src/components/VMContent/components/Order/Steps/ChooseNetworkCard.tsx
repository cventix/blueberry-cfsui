import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { Hr } from '../../../../../components/ui-elements/Hr'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'

// styles
import styles from '../Order.module.scss'

export default interface Iprops {}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const ChooseNetworkCard: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.chooseNetworkCard}>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={3} />
			</div>
			<StepDescription stepNumber={4} title={[t`مرحله چهارم: `, steps[3]].join(' ')} subTitle={t`اطلاعات کارت شبکه شما در زیر نمایش داده شده است.`}/>
			<ColorfulBox className={['white', 'lg']} margin={"0 0 145px 0"}>
				<div className="networkInfo">
					<div className="header">
						<div>نام شبکه</div>
						<div>تعداد IP</div>
					</div>
					<Hr backgroundColor={'#e5e5e5'} height={'1px'}/>
					<div className="body">
						<div>Internet180_0</div>
						<div>1</div>
					</div>
				</div>
			</ColorfulBox>
			<Footer/>
		</div>
	)
}
