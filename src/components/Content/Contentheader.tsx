import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { SearchInput } from '../ui-elements/SearchInput/SearchInput'
import { Breadcrumb } from '../ui-elements/Breadcrumb/Breadcrumb'
import { Icon } from '../ui-elements/Icon'

// icons & styles
import list from '../../images/switchViewIcons/list-view.svg'
import grid from '../../images/switchViewIcons/grid-view.svg'
import listViewActive from '../../images/switchViewIcons/list-view-active.svg'
import gridViewActive from '../../images/switchViewIcons/grid-view-active.svg'
import { SwitchIcon } from './Switchicon'
import styles from './Content.module.scss'

export default interface Iprops {
  switchView: (e: string) => void
  view: string
  history?: any
}

export const Contentheader: React.FunctionComponent<Iprops> = ({ history, switchView, view }) => {
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <div className={styles.left}>
        <SwitchIcon switchView={switchView} nextView={'table'} icon={grid} activeicon={gridViewActive} view={view} />
        <SwitchIcon switchView={switchView} nextView={'grid'} icon={list} activeicon={listViewActive} view={view} />
        <SearchInput placeHolder={t`جستجو`} withSetting={true} />
      </div>
    </div>
  )
}
