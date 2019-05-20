import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { t } from 'ttag'

// ui-elements
import { Button } from "../../ui-elements/Button/Button";
import { Progressbar } from '../../ui-elements/Progressbar/Progressbar'
import { IconLink } from "../../ui-elements/IconLink";
import { Icon } from '../../ui-elements/Icon'
import { Caption } from "../../ui-elements/Caption";

// icons
import createServerIcon from '../../../images/vmIcons/create-server.svg'
import purchaseIcon from '../../../images/vmIcons/purchase.svg'
import upgradeIcon from '../../../images/vmIcons/upgrade.svg'
import centosIcon from '../../../images/vmIcons/centos.svg'
import cpuIcon from '../../../images/vmIcons/cpu.svg'
import ramIcon from '../../../images/vmIcons/ram.svg'
import diskIcon from '../../../images/vmIcons/disk.svg'

// styles & internal-component
import { Footer } from './components/Footer'
import { MultipleControl } from './components/Control/Control'
import styles from './Card.module.scss'

export default interface Iprops {
	on?: boolean
	off?: boolean
	purchase?: boolean
	invoice?: boolean
	payment?: boolean
	create?: boolean
	turningOff?: boolean
	defined?: boolean
	status?: string
	os?: string
	cpu?: string
	disk?: string
	ram?: string
}

export const Card: React.FunctionComponent<Iprops> = ({ on, off, purchase, invoice, payment, create, turningOff ,defined, status, os, cpu, disk, ram }) => {
	return (
		<div className={styles.item}>
			<div className={styles.top}>
				{purchase ? <div className={styles.iconWrapper}><Icon src={createServerIcon}/></div> :
					<>
						<div className={styles.right}>
							<div className={styles.title}>MyfirstServer</div>
							<div className={styles.subTitle}>
								{status}
							</div>
						</div>
						<div className={styles.state}>
							<span className={styles.status}>{on || turningOff ? 'ON' : invoice || payment || create  ? 'OFF' : 'DEFINED'}</span>
							<span className={on || turningOff ? `${styles.lamp} ${styles.on}` : invoice || payment || create ? `${styles.lamp} ${styles.off}` : `${styles.lamp} ${styles.problem}`}></span>
						</div>
					</>
				}
			</div>
			<div className={styles.center}>
				{purchase ? <div className={styles.description}>{t`سرور مجازی را به دلخواه خود بسازید`}</div> : 
					<>
						<div className={styles.left}>
							<IconLink icon={centosIcon} iconAlt="linux icon" label={os}/>
							<IconLink icon={cpuIcon} iconAlt="cpu icon" label={cpu}/>
						</div>
						<div className={styles.right}>
							<IconLink icon={diskIcon} iconAlt="disk icon" label={disk}/>
							<IconLink icon={ramIcon} iconAlt="ram icon" label={ram}/>
						</div>
					</>
				}
			</div>
			<Footer className={styles.footer}>
				{
					purchase ? <Link to="/vm/order"><Button className={['btnSuccess0', 'btnLg']}>
						<IconLink icon={purchaseIcon} iconAlt="purchase icon" label={t`خرید سرور جدید`}/>
					</Button></Link>
					: invoice ? <>
						<Button className={['btnSecondary', 'btnSm']} style={{width: '115px'}}>{t`مشاهده صورتحساب`}</Button>
						<Button className={['btnDanger0', 'btnSm']} style={{width: '75px'}}>{t`حذف سرور`}</Button>
					</>
					: payment ? <>
						<Button className={['btnPrimary0', 'btnSm']} style={{width: '115px'}}>{t`پرداخت صورتحساب`}</Button>
						<Button className={['btnDefault0', 'btnSm']} style={{width: '75px'}}>{t`حذف سرور`}</Button>
					</>
					: create ? <Button className={['btnWarning0', 'btnLg']}>
						<IconLink icon={purchaseIcon} iconAlt="create icon" label={t`ایجاد سرور`}/>
					</Button>
					: defined ? <>
						<div className={styles.cloneSteps}>2 / 7  CLONEDISK</div>
						<div className={styles.progressbar}>
							<Progressbar value={30} height={5} color={'yellow'} />
						</div>
					</>
					: turningOff ? <MultipleControl turningOff={true}/> 
					: on ? <MultipleControl /> 
					: ''
				}
			</Footer>
		</div>
	)
}
