import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Hr } from '../../ui-elements/Hr'
import { Button } from '../../ui-elements/Button/Button'
import { DropDownButton } from '../../ui-elements/Button/DropDownButton'

import { IconLink } from '../../ui-elements/IconLink'

// icons
import uploadIcon from '../../../images/upload.svg'
import refreshIcon from '../../../images/refresh.svg'
import downloadIcon from '../../../images/download.svg'
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
  toggle?: any
}

const FM: React.FunctionComponent<Iprops> = ({ onItemClick, selection, toggle }) => {
  let data = [
    { label: `دانلود با فرمت zip`, onClick: onItemClick },
    { label: `دانلود با فرمت iso`, onClick: onItemClick },
    { label: `دانلود با فرمت tar`, onClick: onItemClick }
  ]
 console.log(selection && selection.length > 0 )
  return (
    <div className="menu">
      <Button className={['btnPrimary0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`آپلود فایل`} />
      </Button>
      {toggle[1]  ? (
        <Button   className={[selection && selection.length > 0 ? 'pg-btnSuccess0' : 'btnSuccessOutline', 'btnLg']} style={{ marginBottom: '15px' }}>
          <IconLink onClick ={onItemClick} icon={refreshIcon} iconAlt="upload icon" label={t`بازیابی فایل`} />
        </Button>
      ) : (
        <DropDownButton
          data={data}
          className={[selection && selection.length > 0 ? 'btnSuccess0' : 'btnSuccessOutline', 'btnLg']}
          disabled={!selection || selection.length == 0}
          style={{ marginBottom: '15px' }}
        >
          <IconLink icon={downloadIcon} iconAlt="download icon" label={t` دانلود با فرمت`} />
        </DropDownButton>
      )}
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
const mapStateToProps = (state: any) => ({ select:state,selection: state.selection.selection, toggle: state.selection.toggle})

export default connect(mapStateToProps)(FM)
