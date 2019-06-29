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
import { setProfileTab } from '../../../services/internal/store/actions';

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  profileView?: string
  downloadToken?: string
  setProfileTab: any
}

const AccountSideBar: React.FunctionComponent<Iprops> = ({ onItemClick,setProfileTab, profileView }) => {
  return (
    <div className="sidebar-menu">
      <IconLink icon={edit}  className={`iconLink upFromUrl pg-p-3 ${profileView == t`اطلاعات کاربری` && 'pg-bg-gray-0' }` } iconAlt="upload icon" label={t`اطلاعات کاربری`} onClick={setProfileTab} />
      <IconLink icon={wallet} className={`iconLink upFromUrl pg-p-3 ${profileView == t`پلن` && 'pg-bg-gray-0' }`} iconAlt="upload icon" label={t`پلن`} onClick={setProfileTab} />
      <IconLink icon={security} className={`iconLink upFromUrl  pg-p-3 ${profileView == t`امنیت` && 'pg-bg-gray-0' }`} iconAlt="upload icon" label={t`امنیت`} onClick={setProfileTab}/>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ profileView: state.sidebar.profileTab  })
const mapDispatchToProps = (dispatch: any) => {
    return {
      
      setProfileTab:(value:any)=>dispatch(setProfileTab(value))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AccountSideBar)
