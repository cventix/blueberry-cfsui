import React, { FunctionComponent } from 'react'
import { Breadcrumb } from '../ui-elements/Breadcrumb/Breadcrumb'
import { Icon } from '../ui-elements/Icon'

import list from '../../images/switchViewIcons/list-view.svg'
import grid from '../../images/switchViewIcons/grid-view.svg'
import listViewActive from '../../images/switchViewIcons/list-view-active.svg'
import gridViewActive from '../../images/switchViewIcons/grid-view-active.svg'
import { SearchInput } from '../ui-elements/SearchInput/SearchInput'
import { SwitchIcon } from './Switchicon'

import styles from './Content.module.scss'

const history = [{ title: 'پوشه اصلی', link: '/' }, { title: 'پوشه فرعی', link: '/' }, { title: 'پوشه تست', link: '/', active: true }]

export default interface Iprops {
  switchView: (e: string) => void
  view: string
}

export const Contentheader: React.FunctionComponent<Iprops> = ({ switchView, view }) => {
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <div className={styles.left}>
        <SwitchIcon switchView={switchView} nextView={'table'} icon={grid} activeicon={gridViewActive} view={view} />
        <SwitchIcon switchView={switchView} nextView={'grid'} icon={list} activeicon={listViewActive} view={view} />
        <div>
          <SearchInput placeHolder={'جستجو'} withSetting={true} />
        </div>
      </div>
    </div>
  )
}
