// TODO: if has notification add hasNotif classname
// TODO: current page has current classname

import { NavLink, Link } from 'react-router-dom'
import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../ui-elements/IconLink'
import { Avatar } from '../ui-elements/Avatar'
import { Icon } from '../ui-elements/Icon'

// icons & styles
import fileCloudIcon from '../../images/navbarIcons/file-cloud.svg'
import internetIcon from '../../images/navbarIcons/internet.svg'
import financeIcon from '../../images/navbarIcons/finance.svg'
import statusIcon from '../../images/navbarIcons/status.svg'
import notifIcon from '../../images/navbarIcons/notif.svg'
import vpsIcon from '../../images/navbarIcons/vps.svg'
import logo from '../../images/pg-logo.svg'
import menu from '../../images/hmenu.svg'
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
      tablet-max:pg-h-RSheader
      tablet-max:pg-pr-15p
      tablet-max:pg-pl-15p
      tablet-max:pg-pt-0
      tablet-max:pg-pb-0
      pg-shadow-header
      fixed-on-top
      pg-h-header
      pg-bg-white
      pg-z-1000
      navbar"
    >
      <div className="pg-flex pg-flex-row pg-flex-wrap right">
        <a
          onClick={e => {
            e.preventDefault()
            toggleHamburgerMenu()
          }}
          className="pg-hidden
          tablet-max:pg-flex
          pg-cursor-pointer
          pg-items-center"
        >
          <Icon src={menu} className="pg-ml-6p menu" alt={`menu ${altIcon}`} />
        </a>
        <a
          href="/"
          className="flex-center
          pg-w-sidebar
          tablet-max:pg-w-auto
          laptop:pg-w-140p"
        >
          <Icon src={logo} className="logo" alt="pg-logo" width={58} />
        </a>
        <div
          className="pg-flex hover:pg-text-pink-500 
          tablet-max:pg-hidden
          pg-flex-wrap
          pg-flex-row
          pg-p-0
          pg-mt-23p
          pg-mb-23p
          pg-mr-0
          pg-ml-0
          nav">
          <NavLink to={`/nwfm`} className="pg-ml-30p item" activeClassName="current">
            <IconLink icon={fileCloudIcon} iconAlt={`File-cloud ${altIcon}`} iconWidth={24} label={t`میزبانی‌فایل`} />
          </NavLink>
          <NavLink to={`/vms`} className="pg-ml-30p item" activeClassName="current">
            <IconLink icon={vpsIcon} iconAlt={`vps ${altIcon}`} iconWidth={24} label={t`سرور و هاست`} /> 
          </NavLink>
          <NavLink to={`#`} className="pg-ml-30p item" activeClassName="current">
            <IconLink icon={internetIcon} iconAlt={`Internet ${altIcon}`} iconWidth={24} label={t`اینترنت`} />
          </NavLink>
        </div>
      </div>
      <div
        className="pg-flex
        pg-items-center
        pg-ml-30p
        tablet-max:pg-ml-0 
        left"
      >
        <div
          className="
          pg-overflow-hidden
          pg-flex
          pg-flex-row
          pg-flex-wrap
          nav"
        >
          <IconLink
            icon={notifIcon}
            className="iconLink
          tablet-max:pg-hidden
          pg-relative pg-ml-23p
          hasNotif" iconAlt={`Notif ${altIcon}`} iconWidth={24}/>
          <Link to={`/vms/giftcard`}>
            <IconLink icon={financeIcon}
            className="iconLink
            tablet-max:pg-hidden
            pg-ml-23p"
              iconAlt={`Finance ${altIcon}`}
              iconWidth={24}
            />
          </Link>
          <IconLink
            icon={statusIcon}
            className="iconLink
          pg-ml-23p
          pg-w-30p
          pg-h-30p
          pg-text-center
          pg-rounded-full
          tablet-max:pg-w-34p
          tablet-max:pg-h-34p
          tablet-max:pg-ml-10p
          status"
            iconAlt={`Status ${altIcon}`}
            iconWidth={24}
          />
          <Avatar
            toggleSignout={() => {
              toggleSignout()
            }}
            open={open}
          />
        </div>
      </div>
    </nav>
  )
}
