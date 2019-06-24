import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ButtonGroup } from '../../ui-elements/Button/ButtonGroup'
import { ClipBoard } from '../../ui-elements/Clipboard/Clipboard'
import { CommentInput } from '../../Comment/CommentInput'
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'
import { Comment } from '../../Comment/Comment'
import { Hr } from '../../ui-elements/Hr'

// icons
import upFromUrlIcon from '../../../images/sidebarIcons/upfromurl.svg'
import uploadIcon from '../../../images/upload.svg'

// services
import { generateDownloadLink } from '../../../services/internal/store/actions'

// internal components & styles
import { UpgradeAccount } from './UpgradeAccount/UpgradeAccount'
import FileFiltering from './FileFiltering/FileFiltering'
import { ActionNav } from './ActionNav'
import { Nav } from './Nav'
import '../Sidebar.scss'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  image?: any
  generateDownloadLink?: any
}

const PreviewSideBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item, image, generateDownloadLink }) => {
  console.log(generateDownloadLink)
  return (
    <div className="sidebar-menu">
      <Button className={['pg-btnSuccess0', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <a
          href={`http://localhost:3000/rest/publicAccess/KhDNZ5JdtS/generateDownloadLink`}
          style={{ color: 'inherit' }}
          download
        >
          <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick}/>
        </a>
      </Button>
      <div className="pg-flex pg-flex-row pg-flex-wrap pg-justify-center pg-mt-19p pg-rounded-sm pg-text-xs pg-p-8p">آمار: {JSON.stringify(item.downloadCount)} دانلود</div>
      <div className="pg-mt-37p pg-mb-5">
        <ClipBoard placeholder={`http://cdn.persiangig.com/preview/${item.uuid}/${image}/${item.name}`} onClick={onItemClick} />{' '}
      </div>
      <div className="pg-mb-46p">
        <ButtonGroup
          list={[
            { label: `سایز اصلی`, active: true, onClick: onItemClick },
            { label: `بزرگ`, active: false, onClick: onItemClick },
            { label: `متوسط`, active: false, onClick: onItemClick },
            { label: `کوچک`, active: false, onClick: onItemClick }
          ]}
        />
      </div>
      <div>
        
        {/* <CommentInput /> */}
        {/* <Comment user={'shaghz'} comment={'12/2/32'} details={'عکس بسیار قشنگی است. لطفا این قبیل کارها را ادامه بده'}/> */}
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ item: state.sidebar.item, image: state.sidebar.image })

export default connect(
  mapStateToProps
)(PreviewSideBarImage)
