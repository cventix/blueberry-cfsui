import * as React from 'react'

// ui-elements
import { Button } from '../../../../ui-elements/Button/Button'
import { Tooltip } from '../../../../ui-elements/Tooltip/Tooltip'
import { Icon } from '../../../../ui-elements/Icon'

// icons & style
import powerRedIcon from '../../../../../images/vmIcons/power-red.svg'
import plugIcon from '../../../../../images/vmIcons/plug.svg'
import remoteIcon from '../../../../../images/vmIcons/remote.svg'
import settingIcon from '../../../../../images/vmIcons/setting.svg'
import styles from './Control.module.scss'

export default interface Iprops {
	icon?: string
	text?: string
}

export const Control: React.FunctionComponent<Iprops> = ({ text, icon }) => (
	<div className={styles.control}>
		<Tooltip text={text} width={80} height={27} position={'bottom'}>
			<Button>
				<Icon src={icon} />
			</Button>
		</Tooltip>
	</div>
)

export const MultipleControl: React.FunctionComponent<Iprops> = () => (
	<div className={styles.MultipleControl}>
		<Control icon={powerRedIcon} text={"روشن کن"}/>
		<Control icon={plugIcon} text={"از برق بکش"}/>
		<Control icon={settingIcon} text={"fff"}/>
		<Control icon={remoteIcon} text={"ff"}/>
		<Control icon={settingIcon} text={"ff"}/>
	</div>
)

