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

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
}

const PreviewSideBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item }) => {
  console.log(item.downloadCount)
  return (
    <div className="menu">
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <a href={`http://cdn.persiangig.com/preview/${item.uuid}/medium/${item.name}`} style={{ color: 'inherit' }} download={`http://cdn.persiangig.com/preview/${item.uuid}/medium/${item.name}`} >
          <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} />
        </a>
      </Button>
      <div className={'downloadBox'}>آمار:  {JSON.stringify(item.downloadCount)} دانلود</div>
      <div className={'copyBox'}>
        <ClipBoard placeholder={`http://cdn.persiangig.com/preview/${item.uuid}/medium/${item.name}`} onClick={onItemClick} />{' '}
      </div>
      <div className={'buttonGroup'}>
        <ButtonGroup
          list={[
            { label: `سایز اصلی`, active: true },
            { label: `بزرگ`, active: false },
            { label: `متوسط`, active: false },
            { label: `کوچک`, active: false }
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
const mapStateToProps = (state: any) => ({ item: state.sidebar.item })

export default connect(mapStateToProps)(PreviewSideBarImage)
