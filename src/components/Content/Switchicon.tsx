import React, { FunctionComponent } from 'react'

import { Tooltip } from '../ui-elements/Tooltip/Tooltip'
import { Icon } from '../ui-elements/Icon'

import styles from './Content.module.scss'

export default interface Iprops {
  switchView: (e: string) => void
  view: string
  nextView: string
  icon?: any
  activeicon?: any
}

export const SwitchIcon: React.FunctionComponent<Iprops> = ({ switchView, view, icon, activeicon, nextView }) => {
  console.log(icon)
  return (
    <div className={styles.flex} onClick={() => switchView(nextView)}>
      <Tooltip text={nextView ==='grid' ? ' نمایش لیستی' : 'نمایش شبکه ای '} width={90} height={27} position={'top'}>
        <Icon src={view !== nextView ? icon : activeicon} />
      </Tooltip>
    </div>
  )
}
