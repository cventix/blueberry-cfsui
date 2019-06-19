// TODO: if has notification add hasNotif classname
// TODO: current page has current classname

import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { t } from 'ttag'

// ui-elements
import { Icon } from '../ui-elements/Icon'
import { IconLink } from '../ui-elements/IconLink'
import { Avatar } from '../ui-elements/Avatar'

// icons & styles
import logo from '../../images/pg-logo.svg'
import menu from '../../images/hmenu.svg'
import fileCloudIcon from '../../images/navbarIcons/file-cloud.svg'
import vpsIcon from '../../images/navbarIcons/vps.svg'
import internetIcon from '../../images/navbarIcons/internet.svg'
import statusIcon from '../../images/navbarIcons/status.svg'
import financeIcon from '../../images/navbarIcons/finance.svg'
import notifIcon from '../../images/navbarIcons/notif.svg'
import './Navbar.scss'

export default interface Iprops {
  toggleHamburgerMenu: () => void
  toggleSignout: () => void
  open: boolean
}

export const Navbar: React.FunctionComponent<Iprops> = ({ toggleHamburgerMenu, toggleSignout, open }: Iprops) => {
  const altIcon = 'Icon'
  return (
    <nav
      className="flex-row-wrap-withspace
      fixed-on-top
      pg-h-header
      pg-bg-white
      pg-z-50
      pg-shadow-header
      tablet-max:pg-h-RSheader
      tablet-max:pg-pt-0
      tablet-max:pg-pb-0
      tablet-max:pg-pr-15p
      tablet-max:pg-pl-15p
      navbar"
    >
      <div className="pg-flex pg-flex-row right">
        <a onClick={e => {e.preventDefault(); toggleHamburgerMenu()}} 
        className="pg-hidden
        pg-items-center
        pg-cursor-pointer
        tablet-max:pg-flex
        menuWrapper">
          <Icon src={menu} className="pg-ml-6p menu" alt={`menu ${altIcon}`} />
        </a>
        <a href="/" className="flex-center pg-w-sidebar tablet-max:pg-w-auto logoWrapper">
          <Icon src={logo} className="logo" alt="pg-logo" />
        </a>
        <div className="pg-flex pg-flex-row pg-flex-wrap pg-p-0 tablet-max:pg-hidden nav">
          <NavLink to={`/fm`} className="item" activeClassName="current">
            <IconLink icon={fileCloudIcon} iconAlt={`File-cloud ${altIcon}`} label={t`میزبانی‌فایل`} />
          </NavLink>
          <NavLink to={`/vm`} className="item" activeClassName="current">
            <IconLink icon={vpsIcon} iconAlt={`vps ${altIcon}`} label={t`سرور و هاست`} /> 
          </NavLink>
          <NavLink to={`#`} className="item" activeClassName="current">
            <IconLink icon={internetIcon} iconAlt={`Internet ${altIcon}`} label={t`اینترنت`} />
          </NavLink>
        </div>
      </div>
      <div className="pg-flex pg-items-center pg-ml-sidebar tablet-max:pg-ml-0 left">
        <div className="pg-flex pg-flex-row pg-flex-wrap pg-overflow-hidden nav">
          <IconLink icon={notifIcon} className="iconLink webIcon hasNotif" iconAlt={`Notif ${altIcon}`} />
          <Link to={`/vm/giftcard`}>
            <IconLink icon={financeIcon} className="iconLink webIcon" iconAlt={`Finance ${altIcon}`}/>
          </Link>
          <IconLink icon={statusIcon} className="iconLink status" iconAlt={`Status ${altIcon}`} />
          <Avatar toggleSignout={() => {toggleSignout()}} open={open}/>
        </div>
      </div>
    </nav>
  )
}
