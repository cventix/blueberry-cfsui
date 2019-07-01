import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../ui-elements/Button/Button'
import { IconLink } from '../../ui-elements/IconLink'
import { ClipBoard } from '../../ui-elements/Clipboard/Clipboard'
import { ButtonGroup } from '../../ui-elements/Button/ButtonGroup'

// icons
import uploadIcon from '../../../images/upload.svg'

// internal components & styles
import '../Sidebar.scss'

//to be added
import { Comment } from '../../Comment/Comment'
import { CommentInput } from '../../Comment/CommentInput'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
  image?: any
  generateDownloadLink?: any
  downloadToken?: string
}

const PreviewSideBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item, image }) => {
  let imageUrl
  if (image) imageUrl = `/${image}`
  return (
    <div className="sidebar-menu">
      <Button className={['pg-btnSuccess', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick} />
      </Button>
      <div className="pg-flex pg-flex-row pg-flex-wrap pg-justify-center pg-mt-19p pg-rounded-sm pg-text-xs pg-p-8p">
        آمار: {JSON.stringify(item.downloadCount)} دانلود
      </div>
      <div className="pg-mt-37p pg-mb-5">
        <ClipBoard placeholder={`http://cdn.persiangig.com/preview/${item.uuid}${imageUrl}/${item.name}`} />
      </div>
      <div className="pg-mb-46p">
        <ButtonGroup
          list={[
            { label: `سایز اصلی`, active: !image, onClick: onItemClick },
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
