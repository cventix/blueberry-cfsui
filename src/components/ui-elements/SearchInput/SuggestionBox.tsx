import * as React from 'react'
import { t } from 'ttag'

// styles
import styles from './SearchInput.module.scss'
import { Icon } from '../Icon';
import close from '../../../images/buttonIcons/icon-btn-refresh-copy.svg'
import ContentBody from '../../Content/ContentBody';

// interface
export default interface Iprops {
  open: boolean
  toClose?: any
  table?: any
}

export const SuggestionBox = ({ open = false, toClose ,table}: Iprops) => {
  return (
    <div className={styles.suggestionBox}>
      <div className={styles.header}>
        <div> {t`جستجو در پوشه اصلی`}</div>
        <button className={styles.close} onClick={toClose}>
            <Icon className={styles.closeIcon} src={close} />
          </button>
      </div>
      <ContentBody
              view={'grid'}
              table={table}
              isMoveModal={true}
              dropdown={false}
              checkbox={false}
              hasHeader={false}
             smPadding={true}
            />
        <div className={styles.forMore}>نمایش همه نتایج جستجو</div>
    </div>
  )
}
