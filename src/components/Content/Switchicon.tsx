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
  return (
    <div className={styles.flex} onClick={() => switchView(nextView)}>
      <Tooltip text={' نمایش لیستی'} width={90} height={27} position={'top'}>
        <Icon src={view !== nextView ? icon : activeicon} />
        dsd
      </Tooltip>
    </div>
  )
}
