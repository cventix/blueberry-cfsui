import React, { Component } from 'react'
import { t } from 'ttag'

// ui-elements
import { Button } from "../../ui-elements/Button/Button";
import { IconLink } from "../../ui-elements/IconLink";
import { Caption } from "../../ui-elements/Caption";

// icons
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
	item?: any
	on?: boolean
	off?: boolean
}

export const Card: React.FunctionComponent<Iprops> = ({ item, on,  off}) => {
	return (
		<div className={styles.item}>
			<div className={styles.top}>
				<div className={styles.right}>
					<div className={styles.title}>MyfirstServer</div>
					<div className={styles.subTitle}>198.143.181.40</div>
				</div>
				<div className={styles.state}>
					<span className={styles.status}>{on ? 'ON' : off ? 'OFF' : 'DEFINED'}</span>
					<span className={on ? `${styles.lamp} ${styles.on}` : off ? `${styles.lamp} ${styles.off}` : `${styles.lamp} ${styles.problem}`}></span>
				</div>
			</div>
			<div className={styles.center}>
				<div className={styles.left}>
					<IconLink icon={centosIcon} iconAlt="linux icon" label={"CentOs6.7"}/>
					<IconLink icon={cpuIcon} iconAlt="cpu icon" label={"8GHz (4core)"}/>
				</div>
				<div className={styles.right}>
					<IconLink icon={diskIcon} iconAlt="disk icon" label={"8GB"}/>
					<IconLink icon={ramIcon} iconAlt="ram icon" label={"10GB"}/>
				</div>
			</div>
			<Footer className={styles.footer}>
				<MultipleControl />
				<Button className={['btnSuccess0', 'btnLg']}>
					<IconLink icon={upgradeIcon} iconAlt="upgrade icon" label={t`خرید سرور جدید`}/>
				</Button>
				<div>
					<Button className={['btnPrimary0']}>
						<IconLink icon={upgradeIcon} iconAlt="upgrade icon" label={t`خرید سرور جدید`}/>
					</Button>
					<Button className={['btnPrimary0']}>
						<IconLink icon={upgradeIcon} iconAlt="upgrade icon" label={t`خرید سرور جدید`}/>
					</Button>
				</div>
			</Footer>
		</div>
	)
}
