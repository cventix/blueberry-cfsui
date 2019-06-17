import * as React from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'
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
import '../Sidebar.scss'


export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  image?: string
  downloadToken?: string
}

const PreviewSideBar: React.FunctionComponent<Iprops> = ({ onItemClick, item, image, downloadToken }) => {
  return (
    <div className="menu">
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick} />
      </Button>
      <IconLink icon={upFromUrlIcon} onClick={onItemClick} className="iconLink upFromUrl" iconAlt="upload icon" label={t`آپلود فایل از URL`} />
      <ActionNav onItemClick={onItemClick} hide={true} />
      <Hr />
      <FileFiltering forFM={true} onItemClick={onItemClick} />
      <UpgradeAccount forPreview={true} />
    </div>
  )
}

const mapStateToProps = (state: any) => ({ item: state.sidebar.item, image: state.sidebar.image, downloadToken: state.sidebar.downloadToken })

export default connect(mapStateToProps)(PreviewSideBar)
