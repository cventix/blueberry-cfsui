import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { ColorfulBox } from '../../../../components/ui-elements/ColorfulBox/ColorfulBox'
import { Button } from '../../../../components/ui-elements/Button/Button'
import { IconLink } from '../../../../components/ui-elements/IconLink'

// internal-component
import { Card } from '../../../VMGrid/Card/Card'
import { MultiplePlan } from '../../../VMGrid/Card/components/Control/Control'
import  OrderCard from '../Order/Steps/Card/Card'

// styles & icon
import upgradeIcon from '../../../../images/vmIcons/upgrade-white.svg'
import styles from './VMDetails.module.scss'

export default interface Iprops {}

export const VMDetailsUpgrade: React.FunctionComponent<Iprops> = () => { 
	return (
		<div className={styles.VMDetails}>
			<Card 
				fullScreen={true}
				Extended={true}
				showDetails={true}
				os="CentOs6.7"
				cpu="8GHz (4core)"
				disk="8GB"
				ram="10GB"
				on={true} status={"198.143.181.40"}
			/>
			<div className={styles.cardWrapper}>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
				<OrderCard footerData={<MultiplePlan activePlanNum={1}/>} 
				className={styles.choosePlanCard} 
				withoutHover={true}
				active={true}>
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
				</OrderCard>
			</div>
			<div className={styles.upgradeFooter}>
				<ColorfulBox className={['blue', 'lg']}>
					<div className={styles.vmInfo}>
						<div className={styles.value}>{'VPS1'}</div>
						<div className={styles.value}>{'۳ ماهه'}</div>
						<div><span className={styles.label}>{t`هزینه استرداد`}:  </span><span className={styles.value}>۲۷۰,۰۰۰ ریال</span></div>
						<div><span className={styles.label}>{t`هزینه سرویس`}:  </span><span className={styles.value}>۲۷۰,۰۰۰ ریال</span></div>
						<div><span className={styles.value}>{t`کل هزینه`}:  </span><span className={styles.value}>۲۷۰,۰۰۰ ریال</span></div>
					</div>
					<Button className={['btnPrimary0', 'btnSm']} style={{width: '150px'}}>
						<IconLink icon={upgradeIcon} label={t`اعمال ارتقاء`} className={`iconLink ${styles.inBtn}`}/>
					</Button>
				</ColorfulBox>
			</div>
		</div>
	)
}
