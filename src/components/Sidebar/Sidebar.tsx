import * as React from 'react'

// ui-elements
import { Hr } from '../ui-elements/Hr'
import { Button } from '../ui-elements/Button/Button'

// icons
import uploadIcon from '../../images/upload.svg'
import upFromUrlIcon from '../../images/sidebarIcons/upfromurl.svg'

// internal components & styles
import { ActionNav } from './components/ActionNav'
import { UpgradeAccount } from './components/UpgradeAccount/UpgradeAccount'
import { Nav } from './components/Nav'
import { IconLink } from '../ui-elements/IconLink'
import './Sidebar.scss'

export default interface Iprops {}

export const Sidebar: React.FunctionComponent<Iprops> = ({  }: Iprops) => {
  return (
    <aside className="sidebar">
      <div className="menuWrapper">
        <div className="menu">
          <Button className={['btnPrimary0', 'btnLg']} style={{ marginBottom: '15px' }}>
            <IconLink icon={uploadIcon} iconAlt="upload icon" label="آپلود فایل" />
          </Button>
          <IconLink icon={upFromUrlIcon} className="iconLink upFromUrl" iconAlt="upload icon" label="آپلود فایل از URL" />
          <ActionNav />
          <Hr />
          <UpgradeAccount />
          <Hr />
          <Nav />
        </div>
      </div>
    </aside>
  )
}
