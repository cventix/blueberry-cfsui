import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import Toggle from '../../../ui-elements/Toggle/Toggle'

// styles
import styles from './FileFiltering.module.scss'

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
      <div className={forFM ? `pg-mr-11p pg-h-22p pg-leading-snug pg-mt-21p ${styles.option}` : `hide`} onClick={onItemClick}>
        <Toggle checked={selection.toggle[0]} name={t`به اشتراک گذاشته‌ شده‌ها`} />
        <span className={`pg-mr-10p pg-text-gray-800 pg-align-middle ${styles.text}`}>{t`به اشتراک گذاشته‌ شده‌ها`}</span>
      </div>
      <div className={forFM ? `pg-mr-11p pg-h-22p pg-leading-snug pg-mt-21p ${styles.option}` : `hide`} onClick={onItemClick}>
        <Toggle checked={selection.toggle[1]} name={t`نمایش حذف شده‌ها`} />
        <span className={`pg-mr-10p pg-text-gray-800 pg-align-middle ${styles.text}`}>{t`نمایش حذف شده‌ها`}</span>
      </div>
      <div className={forVM ? `pg-mr-11p pg-h-22p pg-leading-snug pg-mt-21p ${styles.option}` : `hide`}>
        <Toggle checked={false} />
        <span className={`pg-mr-10p pg-text-gray-800 pg-align-middle ${styles.text}`}>{t`نمایش سرورهای فعال`}</span>
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ router: state.router, selection: state.selection })

export default connect(mapStateToProps)(FileFiltering)
