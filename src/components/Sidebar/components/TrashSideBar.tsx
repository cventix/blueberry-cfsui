import * as React from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'
// ui-elements
import { Hr } from '../../ui-elements/Hr'
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'

// icons
import refreshIcon from '../../../images/refresh.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.1.svg'

// internal components & styles
import FileFiltering from './FileFiltering/FileFiltering'
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import { Nav } from './Nav'
import '../Sidebar.scss'


export interface Iprops {
  onItemClick?: (e: any) => void
  selection?: number[]
}

const TrashSideBar: React.FunctionComponent<Iprops> = ({ onItemClick, selection }) => {
  return (
    <div className="sidebar-menu">
      <Button className={[selection && selection.length > 0 ? 'pg-btnSuccess0' : 'pg-btnDisabled', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink onClick={onItemClick} icon={refreshIcon} iconAlt="upload icon" label={t`بازیابی فایل`} />
      </Button>
      <Button className={[selection && selection.length > 0 ? 'pg-btnDanger0' : 'pg-btnDisabled', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={deleteIcon} iconAlt="upload icon" label={t`حذف دائم`} onClick={onItemClick} />
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
