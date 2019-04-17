import React, { FunctionComponent } from 'react'
import { Breadcrumb } from '../ui-elements/Breadcrumb/Breadcrumb'
import { Icon } from '../ui-elements/Icon'

import list from '../../images/switchViewIcons/list-view.svg'
import grid from '../../images/switchViewIcons/grid-view.svg'
import listViewActive from '../../images/switchViewIcons/list-view-active.svg'
import gridViewActive from '../../images/switchViewIcons/grid-view-active.svg'

import styles from './Content.module.scss'
import { SearchInput } from '../ui-elements/SearchInput/SearchInput'
import { Tooltip } from '../ui-elements/Tooltip/Tooltip'
const history = [{ title: 'پوشه اصلی', link: '/' }, { title: 'پوشه فرعی', link: '/' }, { title: 'پوشه تست', link: '/', active: true }]

export default interface Iprops {
  switchView: (e: string) => void
  view: string
}

export const Contentheader: React.FunctionComponent<Iprops> = ({ switchView, view }) => {
  const viewStyles = [{ type: 'grid', tooltip: ' نمایش شبکه ای' }, { type: 'table', tooltip: ' نمایش لیستی' }]
  console.log(view)
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <div className={styles.left}>
        <div className={styles.flex} onClick={() => switchView('table')}>
          <Tooltip text={' نمایش لیستی'} width={90} height={27} position={'top'}>
            <Icon src={view === 'grid' ? grid : gridViewActive} />
          </Tooltip>
        </div>
        <div className={styles.flex} onClick={() => switchView('grid')}>
          <Tooltip text={' نمایش شبکه ای'} width={90} height={27} position={'top'}>
            <Icon src={view === 'table' ? list : listViewActive} />
          </Tooltip>
        </div>
        <div>
          <SearchInput placeHolder={'جستجو'} withSetting={true} />
        </div>
      </div>
    </div>
  )
}
