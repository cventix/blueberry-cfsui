import * as React from 'react'
import { Link } from 'react-router-dom';
import { t } from 'ttag'

// ui-elements
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'
import { Hr } from '../../ui-elements/Hr'

// icons
import upFromUrlIcon from '../../../images/sidebarIcons/upfromurl.svg'
import purchaseIcon from '../../../images/vmIcons/purchase.svg'

// internal components & styles
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import FileFiltering  from './FileFiltering/FileFiltering'
import { ActionNav } from './ActionNav'
import { Nav } from './Nav'
import '../Sidebar.scss'

export default interface Iprops {
  onItemClick?: (e: any) => void
}

export const VM: React.FunctionComponent<Iprops> = ({ onItemClick }) => {
  return (
    <div className="sidebar-menu">
      <Link to="/vms/order/SelectOs">
        <Button className={['pg-btnSuccess0', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
          <IconLink icon={purchaseIcon} iconAlt="upload icon" label={t`خرید سرور جدید`}/>
        </Button> 
      </Link>
      <IconLink icon={upFromUrlIcon} className="pg-flex pg-items-center pg-mb-14p pg-bg-gray-0 pg-w-200p pg-h-35p pg-font-vMedium pg-border-0 pg-pr-11p pg-cursor-pointer pg-text-right pg-rounded-br-sm iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`}/>
      <ActionNav onItemClick={onItemClick}/>
      <Hr />
      <FileFiltering forVM={true}/>
      <UpgradeAccount forVM={true}/>
    </div>
  )
}
