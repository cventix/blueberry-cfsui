import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Hr } from '../../Hr'
import { Button } from '../../Button/Button'
import { IconLink } from '../../IconLink'

// icons
import uploadIcon from '../../../../images/upload.svg'

// internal components & styles

import { connect } from 'react-redux'

import styles from './DownloadBar.module.scss'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
}

const DownlaodBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item }) => {
  console.log(item.downloadCount)
  return (
    <div className={styles.downloadBar}>
      <div className={styles.downloadBox}>آمار: {JSON.stringify(item.downloadCount)} دانلود</div>
      <Button className={['btnSuccess0', 'btnLg']} style={{ marginBottom: '15px' }}>
        <a
          href={`http://cdn.persiangig.com/preview/${item.uuid}/medium/${item.name}`}
          style={{ color: 'inherit' }}
          download={`http://cdn.persiangig.com/preview/${item.uuid}/medium/${item.name}`}
        >
          <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} />
        </a>
      </Button>
      <div className={styles.sizeBox}> حجم فایل: ۱.۲۹ مگابایت</div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ item: state.sidebar.item })

export default connect(mapStateToProps)(DownlaodBarImage)