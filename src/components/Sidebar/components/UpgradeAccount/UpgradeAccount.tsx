import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Progressbar } from '../../../ui-elements/Progressbar/Progressbar'
import { IconLink } from '../../../ui-elements/IconLink'

// icons & styles
import arrowLeftIcon from '../../../../images/arrow-left.svg'
import styles from './UpgradeAccount.module.scss'
import { Link } from 'react-router-dom';

export default interface Iprops {
  percent?: number
  forVM?: boolean
  forPreview?: boolean
}

export const UpgradeAccount = ({ percent = 0, forVM, forPreview }: Iprops) => {
  return (
    <div className={forVM || forPreview ? [styles.upgradeAccount, styles.forVM].join(' ') : styles.upgradeAccount}>
      <div className={'pg-font-vLight'}>
        ٪{`${percent}`} {t`از حجم شما استفاده شده`}
      </div>
      <div className="pg-mt-0 pg-mr-6p pg-mb-2p pg-ml-6p">
        <Progressbar value={percent} height={8} color={'green'} />
      </div>
      <span className={`pg-font-vLight pg-pb-13p pg-text-xs pg-text-gray-800 ${styles.deleteQus}`}>{t`می‌خواهید فایل‌هایتان حذف نشود؟`}</span>
      <Link to={'/nwaccount/plans/upgrade'}><IconLink icon={arrowLeftIcon}
      className={forVM || forPreview ? `hide` : `absolute-on-bottom pg-flex pg-flex-row pg-pt-8p pg-pb-8p pg-pr-6 pg-pl-6 pg-cursor-pointer pg-font-vMedium pg-text-gray-800 pg-bg-yellow-300 pg-h-10 pg-flex pg-flex pg-items-center ${styles.bottom}`} iconAlt="arrow-left" label={t`ارتقاء حساب میزبانی`} />
  </Link>
    </div>
  )
}
