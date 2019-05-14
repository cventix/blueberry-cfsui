import React, { FunctionComponent } from 'react'

import { Tooltip } from '../ui-elements/Tooltip/Tooltip'
import { Icon } from '../ui-elements/Icon'

//styles
import styles from './Content.module.scss'

export default interface Iprops {
  switchView: (e: string) => void
  view: string
  nextView: string
  icon?: string
  activeIcon?: string
}

export const SwitchIcon: React.FunctionComponent<Iprops> = ({ switchView, view, icon, activeIcon, nextView }) => {
  return (
    <div className={styles.flex} onClick={() => switchView(nextView)}>
      <Tooltip text={nextView === 'grid' ? ' نمایش لیستی' : 'نمایش شبکه ای '} width={90} height={27} position={'top'}>
        <Icon src={view !== nextView ? icon : activeIcon} />
      </Tooltip>
    </div>
  )
}
