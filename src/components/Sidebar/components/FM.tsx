import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { DropDownButton } from '../../ui-elements/Button/DropDownButton'
import { Button } from '../../ui-elements/Button/Button'
import { Hr } from '../../ui-elements/Hr'

import { IconLink } from '../../ui-elements/IconLink'

// icons
import upFromUrlIcon from '../../../images/sidebarIcons/upfromurl.svg'
import downloadIcon from '../../../images/download.svg'
import refreshIcon from '../../../images/refresh.svg'
import uploadIcon from '../../../images/upload.svg'

// internal components & styles
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import FileFiltering from './FileFiltering/FileFiltering'
import { ActionNav } from './ActionNav'
import { Nav } from './Nav'
import '../Sidebar.scss'
import FileUploadModal from '../../ui-elements/Modal/FileUploadModal/FileUploadModal'
import FileInput from 'react-fine-uploader/file-input'
import { getUserInfo } from '../../../services/internal/store/actions'
import { useEffect } from 'react'
export interface Iprops {
  onItemClick?: any
  selection?: number[]
  toggle?: any
  uploader?: any
  getUserInfo?: any
  userInfo?: any
}

const FM: React.FunctionComponent<Iprops> = ({ onItemClick, selection, getUserInfo, userInfo, uploader }) => {
  let data = [
    { label: `دانلود با فرمت zip`, onClick: onItemClick },
    { label: `دانلود با فرمت iso`, onClick: onItemClick },
    { label: `دانلود با فرمت tar`, onClick: onItemClick }
  ]
  useEffect(() => {
    if (userInfo.length < 1) getUserInfo()
  }, [])
  return (
    <div className="sidebar-menu">
      <div onClick={() => onItemClick(t`آپلود فایل`)}>
        <Button className={['pg-btnPrimary', 'pg-btnLg']} style={{ marginBottom: '15px', cursor: 'pointer' }} id={'upload'}>
          <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`آپلود فایل`} />
          <div className={'pg-absolute pg-top-0 pg-w-full pg-opacity-0'}>
            <FileInput uploader={uploader} className={'fileUploader-wrapper'} />
          </div>
        </Button>
      </div>
      <DropDownButton
        data={data}
        className={[selection && selection.length > 0 ? 'pg-btnSuccess' : 'pg-btnSuccess pg-btnSuccessOutline', 'pg-btnLg']}
        disabled={!selection || selection.length == 0}
        style={{ marginBottom: '15px' }}
      >
        <IconLink icon={downloadIcon} iconAlt="download icon" label={t` دانلود با فرمت`} />
      </DropDownButton>
      <IconLink
        icon={upFromUrlIcon}
        onClick={onItemClick}
        className="pg-flex pg-items-center pg-mb-14p pg-w-200p pg-h-35p pg-font-vMedium pg-border-0 pg-pr-11p pg-cursor-pointer pg-text-right pg-rounded-br-sm iconLink upFromUrl"
        iconAlt="upload icon"
        label={t`آپلود فایل از URL`}
      />
      <ActionNav onItemClick={onItemClick} />
      <Hr />
      <FileFiltering forFM={true} onItemClick={onItemClick} />
      <UpgradeAccount percent={userInfo && userInfo.plan && +(userInfo.quota / JSON.parse(userInfo.plan.jsonInfo).quota).toFixed(2)} />
      <Hr />
      <Nav />
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserInfo: () => dispatch(getUserInfo())
  }
}
const mapStateToProps = (state: any) => ({
  select: state,
  selection: state.selection.selection,
  toggle: state.selection.toggle,
  uploader: state.document.uploader,
  userInfo: state.account.info
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FM)
