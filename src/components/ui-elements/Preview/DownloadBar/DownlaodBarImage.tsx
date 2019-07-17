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
import { formatBytes } from '../../../../services/internal/utils/formatBytes'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
}

const DownloadBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item }) => {
  console.log(item.downloadCount)
  return (
    <div className={styles.downloadBar}>
      <div className={styles.downloadBox}>آمار: {item.downloadCount ? JSON.stringify(item.downloadCount) : '0'} دانلود</div>
      <Button className={['pg-btnSuccess0', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick} />
      </Button>
      <div className={styles.sizeBox}> حجم فایل:{item.size}</div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ item: state.sidebar.item })

export default connect(mapStateToProps)(DownloadBarImage)
