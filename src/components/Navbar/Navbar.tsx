// TODO: if has notification add hasNotif classname
// TODO: current page has current classname

import * as React from 'react'

// ui-elements
import { Icon } from '../ui-elements/Icon'
import { IconLink } from '../ui-elements/IconLink'
import { Avatar } from '../ui-elements/Avatar'

// icons
import logo from '../../images/pg-logo.svg'
import fileCloudIcon from '../../images/navbarIcons/file-cloud.svg'
import vpsIcon from '../../images/navbarIcons/vps.svg'
import internetIcon from '../../images/navbarIcons/internet.svg'
import statusIcon from '../../images/navbarIcons/status.svg'
import financeIcon from '../../images/navbarIcons/finance.svg'
import notifIcon from '../../images/navbarIcons/notif.svg'

// styles
import './Navbar.scss'

export default interface Iprops {}

export const Navbar: React.FunctionComponent<Iprops> = ({  }: Iprops) => {
  const altIcon = 'Icon'
  return (
    <div className="navbar">
      <div className="right">
        <a href="/" className="logoWrapper">
          <Icon src={logo} className="logo" alt="pg-logo" />
        </a>
        <div className="nav">
          <IconLink icon={fileCloudIcon} className="iconLink current" iconAlt={`File-cloud ${altIcon}`} label="میزبانی‌فایل" />
          <IconLink icon={vpsIcon} iconAlt={`vps ${altIcon}`} label="سرور و هاست" />
          <IconLink icon={internetIcon} iconAlt={`Internet ${altIcon}`} label="اینترنت" />
        </div>
      </div>
      <div className="left">
        <div className="nav">
          <IconLink icon={notifIcon} className="iconLink webIcon hasNotif" iconAlt={`Notif ${altIcon}`} />
          <IconLink icon={financeIcon} className="iconLink webIcon" iconAlt={`Finance ${altIcon}`} />
          <IconLink icon={statusIcon} className="iconLink status" iconAlt={`Status ${altIcon}`} />
          <Avatar />
        </div>
      </div>
    </div>
  )
}
