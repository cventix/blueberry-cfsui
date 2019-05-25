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
import FileFiltering from './FileFiltering/FileFiltering'
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import { Nav } from './Nav'
import '../Sidebar.scss'
import { connect } from 'react-redux'

export interface Iprops {
  onItemClick?: (e: any) => void
  selection?: number[]
}

 const FM: React.FunctionComponent<Iprops> = ({ onItemClick, selection }) => {
  console.log(selection)
  return (
    <div className="menu">
      <Button className={['btnPrimary0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`آپلود فایل`} />
      </Button>
      <Button className={[selection && selection.length > 0 ? 'btnSuccess0' : 'btnSuccessOutline', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="download icon" label={t` دانلود با فرمت`} />
      </Button>
      <IconLink icon={upFromUrlIcon} onClick={onItemClick} className="iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`} />
      <ActionNav onItemClick={onItemClick} />
      <Hr />
      <FileFiltering forFM={true} onItemClick={onItemClick} />
      <UpgradeAccount />
      <Hr />
      <Nav />
    </div>
  )
}
const mapStateToProps = (state: any) => ({ selection: state.selection.selection })

export default connect(mapStateToProps)(FM)
