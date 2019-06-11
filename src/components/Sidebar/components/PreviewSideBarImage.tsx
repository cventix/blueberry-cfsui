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
  downloadToken?: string
}

const PreviewSideBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item, image, generateDownloadLink, downloadToken }) => {
  let imageUrl;
  if (image) imageUrl=`/${image}`
  return (
    <div className="menu">
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick} />
      </Button>
      <div className={'downloadBox'}>آمار: {JSON.stringify(item.downloadCount)} دانلود</div>
      <div className={'copyBox'}>
        <ClipBoard placeholder={`http://cdn.persiangig.com/preview/${item.uuid}${imageUrl}/${item.name}`} onClick={onItemClick} />{' '}
      </div>
      <div className={'buttonGroup'}>
        <ButtonGroup
          list={[
            { label: `سایز اصلی`, active: !image , onClick: onItemClick },
            { label: `بزرگ`, active: image == 'large', onClick: onItemClick },
            { label: `متوسط`, active: image == 'medium', onClick: onItemClick },
            { label: `کوچک`, active: image == 'small', onClick: onItemClick }
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
const mapStateToProps = (state: any) => ({ item: state.sidebar.item, image: state.sidebar.image, downloadToken: state.sidebar.downloadToken })

export default connect(mapStateToProps)(PreviewSideBarImage)
