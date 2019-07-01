import * as React from 'react'
import { t } from 'ttag'

// ui-elements 
import { Icon } from '../Icon'
import ContentBody from '../../Content/ContentBody'

// icons & styles
import close from '../../../images/buttonIcons/icon-btn-refresh-copy.svg'
import styles from './SearchInput.module.scss'

// interface
export default interface Iprops {
  open: boolean
  toClose?: any
  table?: any
}

export const SuggestionBox = ({ open = false, toClose ,table}: Iprops) => {
  return (
    <div className={`pg-absolute pg-hidden pg-w-full pg-rounded-sm pg-shadow-sm pg-bg-white pg-right-0 pg-mt-8p ${styles.suggestionBox}`}>
      <div className={`pg-flex pg-justify-between pg-text-sm pg-p-3p ${styles.header}`}>
        <div> {t`جستجو در پوشه اصلی`}</div>
        <button className={`pg-cursor-pointer pg-m-5p ${styles.close}`} onClick={toClose}>
            <Icon className='pg-w-10p' src={close} />
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
        <div className={`pg-flex pg-justify-center pg-cursor-pointer pg-p-11p ${styles.forMore}`}>نمایش همه نتایج جستجو</div>
    </div>
  )
}
