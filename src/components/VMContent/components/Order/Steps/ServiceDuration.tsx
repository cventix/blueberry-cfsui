import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'
import { Icon } from '../../../../../components/ui-elements/Icon'

// internal-component
import { StepDescription } from './StepDescription'
import { Footer } from './Footer/Footer'
import Card from './Card/Card'

// styles & icons
import monthlyIcon from '../../../../../images/vmIcons/plansIcon/monthly.svg'
import threeMonthIcon from '../../../../../images/vmIcons/plansIcon/3-month.svg'
import sixMonthIcon from '../../../../../images/vmIcons/plansIcon/6-month.svg'
import longIcon from '../../../../../images/vmIcons/plansIcon/long.svg'
import hpcIcon from '../../../../../images/vmIcons/plansIcon/hpc.svg'
import styles from '../Order.module.scss'

export default interface Iprops {}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const ServiceDuration: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.serviceDuration}>
			<ColorfulBox className={['green', 'lg']} withClose={true} message={t`با خرید پلن روزانه، سرور شما هر روز به صورت خودکار تمدید می شود. هر گاه از تمدید منصرف شدید، می توانید سرور را حذف نمایید.`}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={1} />
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
			<Footer/>
		</div>
	)
}
