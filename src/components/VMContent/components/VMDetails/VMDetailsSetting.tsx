import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../../../components/ui-elements/Button/Button'
import { Tooltip } from '../../../../components/ui-elements/Tooltip/Tooltip'
import { IconLink } from '../../../../components/ui-elements/IconLink'
import { Hr } from '../../../../components/ui-elements/Hr'

// internal-component
import { Card } from '../../../VMGrid/Card/Card'

// styles & icon
import whiteDeleteIcon from '../../../../images/delete-white.svg'
import grayDeleteIcon from '../../../../images/delete-gray.svg'
import styles from './VMDetails.module.scss'

export default interface Iprops {}

export const VMDetailsSetting: React.FunctionComponent<Iprops> = () => { 
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
			>
			<div className={styles.wrapper}>
				<div className="networkInfo">
					<div className="header">
						<div>{t`نام شبکه`}</div>
						<div>{t`تعداد IP`}</div>
					</div>
					<Hr backgroundColor={'#e5e5e5'} height={'1px'}/>
					<div className="body">
						<div>Internet180_0</div>
						<div>1</div>
					</div>
				</div>
			</div>
			<div className={`${styles.wrapper} ${styles.deleteVM}`}>
				<div className={styles.right}>
					<div className={styles.title}>{t`حذف سرور مجازی برای همیشه`}</div>
					<div className={styles.hint}>{t`توجه داشته باشید با حذف سرور اطلاعات شما پاک می شود.`}</div>
				</div>
				<div className={styles.left}>
					<Tooltip text={t`ابتدا سرور را خاموش کنید`} width={135} height={27} position={'bottom'}>
						<Button className={['pg-btnDisabled', 'pg-btnSm']} style={{width: '135px'}}>
							<IconLink icon={grayDeleteIcon} label={t`حذف سرور`}/>
						</Button>
					</Tooltip>
					<Button className={['pg-btnDanger', 'pg-btnSm']} style={{width: '135px', marginRight: '32px'}}>
						<IconLink icon={whiteDeleteIcon} label={t`حذف سرور`}/>
					</Button>
				</div>
			</div>
			</Card>
		</div>
	)
}
