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
import { ClipBoard } from '../../ui-elements/Clipboard/Clipboard'
import { ButtonGroup } from '../../ui-elements/Button/ButtonGroup'
import { Comment } from '../../Comment/Comment'
import { CommentInput } from '../../Comment/CommentInput'
import { generateDownloadLink } from '../../../services/internal/store/actions'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  image?: any
  generateDownloadLink?: any
}

const PreviewSideBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item, image,generateDownloadLink }) => {
  console.log(generateDownloadLink)
  return (
    <div className="menu">
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <a
          href={`http://localhost:3000/rest/publicAccess/KhDNZ5JdtS/generateDownloadLink`}
          style={{ color: 'inherit' }}
          download
        >
          <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick}/>
        </a>
      </Button>
      <div className={'downloadBox'}>آمار: {JSON.stringify(item.downloadCount)} دانلود</div>
      <div className={'copyBox'}>
        <ClipBoard placeholder={`http://cdn.persiangig.com/preview/${item.uuid}/${image}/${item.name}`} onClick={onItemClick} />{' '}
      </div>
      <div className={'buttonGroup'}>
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
