import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../../../ui-elements/Button/Button'
import { Tooltip } from '../../../../ui-elements/Tooltip/Tooltip'
import { Icon } from '../../../../ui-elements/Icon'

// icons & style
import upgradeIcon from '../../../../../images/vmIcons/upgrade.svg'
import powerRedIcon from '../../../../../images/vmIcons/power-red.svg'
import powerWhiteIcon from '../../../../../images/vmIcons/power-white.svg'
import plugIcon from '../../../../../images/vmIcons/plug.svg'
import remoteIcon from '../../../../../images/vmIcons/remote.svg'
import settingIcon from '../../../../../images/vmIcons/setting.svg'
import styles from './Control.module.scss'

export default interface Iprops {
	icon?: string
	text?: string
	className?: string
}

export interface MCprops {
	turningOff?: boolean
}

export const Control: React.FunctionComponent<Iprops> = ({ text, icon, className}) => (
	<div className={className ? `${styles.control} ${styles[className]}` : styles.control}>
		<Tooltip text={text} width={80} height={27} position={'bottom'}>
			<Button>
				<Icon src={icon} />
			</Button>
		</Tooltip>
	</div>
)

export const MultipleControl: React.FunctionComponent<MCprops> = ({ turningOff }) => (
	<React.Fragment>
		<Control icon={remoteIcon} text={t`اتصال از دور`}/>
		<Control icon={settingIcon} text={t`تنظیمات`}/>
		<Control icon={upgradeIcon} text={t`تنظیمات ارتقا`}/>
		<Control icon={plugIcon} text={t`از برق بکش`}/>
		{turningOff ? <Control className="off" icon={powerWhiteIcon} text={t`خاموش کن`}/> : <Control icon={powerRedIcon} text={t`روشن کن`}/>}
	</React.Fragment>
)

