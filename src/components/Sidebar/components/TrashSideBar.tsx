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
import newFolderIcon from '../../../images/sidebarIcons/newfolder.svg'
import moveIcon from '../../../images/sidebarIcons/move.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.1.svg'

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

const TrashSideBar: React.FunctionComponent<Iprops> = ({ onItemClick, selection, toggle }) => {
  console.log(selection && selection.length > 0)
  return (
    <div className="menu">
      <Button className={['btnDanger0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={deleteIcon} iconAlt="upload icon" label={t`حذف دائم`} onClick={onItemClick}/>
      </Button>
      <Button className={[selection && selection.length > 0 ? 'btnSuccess0' : 'btnDisabled', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink onClick={onItemClick} icon={refreshIcon} iconAlt="upload icon" label={t`بازیابی فایل`} />
      </Button>
      <FileFiltering forFM={true} onItemClick={onItemClick} />
      <UpgradeAccount />
      <Hr />
      <Nav />
    </div>
  )
}
const mapStateToProps = (state: any) => ({ select: state, selection: state.selection.selection, toggle: state.selection.toggle })

export default connect(mapStateToProps)(TrashSideBar)
