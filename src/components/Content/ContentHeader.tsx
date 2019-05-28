import React, { FunctionComponent } from 'react'
import { t } from 'ttag'
import { Breadcrumb, BreadcrumbItem } from '../ui-elements/Breadcrumb/Breadcrumb'
import { SearchInput } from '../ui-elements/SearchInput/SearchInput'
import { SwitchIcon } from './SwitchIcon'

// Icons
import list from '../../images/switchViewIcons/list-view.svg'
import grid from '../../images/switchViewIcons/grid-view.svg'
import listViewActive from '../../images/switchViewIcons/list-view-active.svg'
import gridViewActive from '../../images/switchViewIcons/grid-view-active.svg'

// Styles
import styles from './Content.module.scss'

export default interface Iprops {
  switchView: (e: string) => void
  handleSearchInput: (e: string) => void
  view: string
  history: BreadcrumbItem[]
}

export const ContentHeader: React.FunctionComponent<Iprops> = ({ history, switchView, view, handleSearchInput }) => {
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <div className={styles.left}>
        <SwitchIcon switchView={switchView} nextView={'table'} icon={grid} activeIcon={gridViewActive} view={view} />
        <SwitchIcon switchView={switchView} nextView={'grid'} icon={list} activeIcon={listViewActive} view={view} />
        <div>
          <SearchInput placeHolder={t`جستجو`} withSetting={true} handleInputChange={(e: string) => handleSearchInput(e)}/>
        </div>
      </div>
    </div>
  )
}
