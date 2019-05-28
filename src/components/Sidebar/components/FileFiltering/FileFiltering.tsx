import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import Toggle from '../../../ui-elements/Toggle/Toggle'

// styles
import styles from './FileFiltering.module.scss'
import { connect } from 'react-redux'

export interface Iprops {
  forFM?: boolean
  onItemClick?: any
  forVM?: boolean
  router?: any
  selection?: any
}

const FileFiltering = ({ forFM, forVM, onItemClick, selection }: Iprops) => {
  console.log(selection.toggle[0], selection.toggle[1])
  return (
    <div className={styles.fileFiltering}>
      <div className={forFM ? styles.option : `hide`} onClick={onItemClick}>
        <Toggle checked={selection.toggle[0]} name={t`به اشتراک گذاشته‌ شده‌ها`} />
        <span className={styles.text}>{t`به اشتراک گذاشته‌ شده‌ها`}</span>
      </div>
      <div className={forFM ? styles.option : `hide`} onClick={onItemClick}>
        <Toggle checked={selection.toggle[1]} name={t`نمایش حذف شده‌ها`} />
        <span className={styles.text}>{t`نمایش حذف شده‌ها`}</span>
      </div>
      <div className={forVM ? styles.option : `hide`}>
        <Toggle checked={false} />
        <span className={styles.text}>{t`نمایش سرورهای فعال`}</span>
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ router: state.router, selection: state.selection })

export default connect(mapStateToProps)(FileFiltering)
