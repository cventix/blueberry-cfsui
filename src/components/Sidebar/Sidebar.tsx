import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Hr } from '../ui-elements/Hr'
import { Button } from '../ui-elements/Button/Button'

// icons
import uploadIcon from '../../images/upload.svg'
import upFromUrlIcon from '../../images/sidebarIcons/upfromurl.svg'

// internal components & styles
import { ActionNav } from './components/ActionNav'
import { FileFiltering } from './components/FileFiltering/FileFiltering'
import { UpgradeAccount } from './components/UpgradeAccount/UpgradeAccount'
import { Nav } from './components/Nav'
import { IconLink } from '../ui-elements/IconLink'
import './Sidebar.scss'

export default interface Iprops {
  createFolderModal?: () => void
  handleCFClose?: any
  showModal?: boolean
}

export const Sidebar: React.FunctionComponent<Iprops> = ({ createFolderModal, handleCFClose, showModal }: Iprops) => {
  return (
    <aside className="sidebar" >
      <div className="menuWrapper">
        <div className="menu">
          <Button className={['btnPrimary0', 'btnLg']} style={{ marginBottom: '15px' }}>
            <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`آپلود فایل`} />
          </Button>
          <IconLink icon={upFromUrlIcon} className="iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`} />
          <ActionNav createFolderModal={createFolderModal} handleCFClose={handleCFClose} showModal={showModal}/>
          <Hr />
          <FileFiltering />
          <UpgradeAccount />
          <Hr />
          <Nav />
        </div>
      </div>
    </aside>
  )
}
