import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'
import { Hr } from '../../ui-elements/Hr'

// icons
import upFromUrlIcon from '../../../images/sidebarIcons/upfromurl.svg'
import uploadIcon from '../../../images/upload.svg'

// internal components & styles
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import FileFiltering from './FileFiltering/FileFiltering'
import { ActionNav } from './ActionNav'
import { Nav } from './Nav'
import '../Sidebar.scss'

export default interface Iprops {
  onItemClick?: (e: any) => void
}

export const PreviewSideBar: React.FunctionComponent<Iprops> = ({ onItemClick }) => {
  return (
    <div className="sidebar-menu">
      <Button className={['pg-btnSuccess0', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} />
      </Button>
      <IconLink icon={upFromUrlIcon} onClick={onItemClick} className="iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`} />
      <ActionNav onItemClick={onItemClick} hide={true} />
      <Hr />
      <FileFiltering forFM={true} onItemClick={onItemClick} />
      <UpgradeAccount forPreview={true}/>
    </div>
  )
}
