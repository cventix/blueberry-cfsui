import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'
import Card from './Card/Card'

// styles
import styles from '../Order.module.scss'

export default interface Iprops {}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const SelectOs: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.selectOs}>
			<ColorfulBox className={['green', 'lg']} withClose={true} message={t`با خرید پلن روزانه، سرور شما هر روز به صورت خودکار تمدید می شود. هر گاه از تمدید منصرف شدید، می توانید سرور را حذف نمایید.`}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={0} />
			</div>
			<StepDescription stepNumber={1} title={[t`مرحله اول: `, steps[0]].join(' ')} subTitle={t`سیستم عاملی که قصد دارید روی سرور مجازی شما نصب شود انتخاب کنید.`}/>
			<div className={styles.cardWrapper}>
				<Card footerData={"Debian 8 (64bit)"}>ewew</Card>
			</div>
			<Footer/>
		</div>
	)
}
