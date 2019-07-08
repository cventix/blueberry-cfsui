import * as React from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'
// ui-elements
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'
import { Hr } from '../../ui-elements/Hr'

// icons
import edit from '../../../images/typeIcons/icon-edit.svg'
import security from '../../../images/typeIcons/icon-lock.svg'
import wallet from '../../../images/typeIcons/icon-wallet.svg'
// internal components & styles
import '../Sidebar.scss'
import { setProfileTab } from '../../../services/internal/store/actions'
import { Link } from 'react-router-dom'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  profileView?: string
  downloadToken?: string
  setProfileTab: any
}

export const AccountSideBar: React.FunctionComponent<Iprops> = () => {
  return (
    <div className="sidebar-menu">
      <Link to={'/account/profile'}>
        <IconLink
          icon={edit}
          className={`iconLink upFromUrl pg-p-3 ${window.location.pathname == '/account/profile' && 'pg-bg-gray-0'}`}
          iconAlt="upload icon"
          label={t`اطلاعات کاربری`}
         
        />
      </Link>
      <Link to={'/account/plans'}>
        <IconLink
          icon={wallet}
          className={`iconLink upFromUrl pg-p-3 ${window.location.pathname == '/account/plans' && 'pg-bg-gray-0'}`}
          iconAlt="upload icon"
          label={t`پلن`}
         
        />
      </Link>
      <Link to={'/account/changePassword'}>
        <IconLink
          icon={security}
          className={`iconLink upFromUrl  pg-p-3 ${window.location.pathname == '/account/changePassword'&& 'pg-bg-gray-0'}`}
          iconAlt="upload icon"
          label={t`امنیت`}
        
        />
      </Link>
    </div>
  )
}


