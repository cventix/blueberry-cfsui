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

export const ChoosePlan: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.choosePlan}>
			<ColorfulBox className={['red', 'lg']} withClose={true} message={t`طرحی انتخاب نکرده‌اید.`}/>
			<div className={styles.stepbarWrapper}>
				<Stepbar steps={steps} currentStep={2} />
			</div>
			<StepDescription stepNumber={2} title={[t`مرحله سوم`, `:`, steps[2]].join(' ')} subTitle={t`کانفیگ سروری که قصد دارید آن را ایجاد کنید انتخاب کنید.`}/>
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
			<Footer nextStep={`vm/order/finalStep`} previousStep={`vm/order/serviceDuration`}/>
		</div>
	)
}
