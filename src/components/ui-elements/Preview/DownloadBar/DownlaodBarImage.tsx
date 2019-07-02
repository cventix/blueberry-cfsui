import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../Button/Button'
import { IconLink } from '../../IconLink'
import { Hr } from '../../Hr'

// icons & styles
import uploadIcon from '../../../../images/upload.svg'
import styles from './DownloadBar.module.scss'

export interface Iprops {
  onItemClick?: (e: any) => void
  item?: any
}

const DownloadBarImage: React.FunctionComponent<Iprops> = ({ onItemClick, item }) => {
  console.log(item.downloadCount)
  return (
    <div className={`pg-bg-white pg-hidden pg-rounded-sm pg-items-center pg-justify-center tablet-max:pg-flex pg-flex-col pg-pt-5 pg-pb-5 pg-pr-0 pg-pl-0 ${styles.downloadBar}`}>
      <div className={`flex-row-wrap pg-p-8p pg-rounded-sm pg-mb-15p pg-text-sm ${styles.downloadBox}`}>آمار: {JSON.stringify(item.downloadCount)} دانلود</div>
      <Button className={['pg-btnSuccess', 'pg-btnLg']} style={{ marginBottom: '15px' }}>
        <IconLink icon={uploadIcon} iconAlt="upload icon" label={t`دانلود فایل`} onClick={onItemClick} />
      </Button>
      <div className={styles.sizeBox}> حجم فایل: ۱.۲۹ مگابایت</div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ item: state.sidebar.item })

export default connect(mapStateToProps)(DownloadBarImage)
