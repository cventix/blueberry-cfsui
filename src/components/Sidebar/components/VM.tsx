import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Hr } from '../../ui-elements/Hr'
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'

// icons
import uploadIcon from '../../../images/upload.svg'
import upFromUrlIcon from '../../../images/sidebarIcons/upfromurl.svg'

// internal components & styles
import { ActionNav } from './ActionNav'
import { FileFiltering } from './FileFiltering/FileFiltering'
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import { Nav } from './Nav'
import '../Sidebar.scss'

export default interface Iprops {
  onItemClick?: (e: any) => void
}

export const VM: React.FunctionComponent<Iprops> = ({ onItemClick }) => {
  return (
    <div className="menu">
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`خرید سرور جدید`}/>
      </Button>
      <IconLink icon={upFromUrlIcon} className="iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`}/>
      <ActionNav onItemClick={onItemClick}/>
      <Hr />
      <FileFiltering forVM={true}/>
      <UpgradeAccount forVM={true}/>
    </div>
  )
}
