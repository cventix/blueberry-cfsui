import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { Progressbar } from '../../../ui-elements/Progressbar/Progressbar'
import { IconLink } from '../../../ui-elements/IconLink'

// icons & styles
import arrowLeftIcon from '../../../../images/arrow-left.svg'
import styles from './UpgradeAccount.module.scss'

export default interface Iprops {
  percent?: number
  forVM?: boolean
}

export const UpgradeAccount = ({ percent = 70, forVM }: Iprops) => {
  return (
    <div className={forVM ? [styles.upgradeAccount, styles.forVM].join(' ') : styles.upgradeAccount}>
      <div className={styles.percent}>٪{`${percent}`} {t`از حجم شما استفاده شده`}</div>
      <div className={styles.progressbar}>
        <Progressbar value={percent} height={8} color={'green'} />
      </div>
      <span className={styles.deleteQus}>{t`می‌خواهید فایل‌هایتان حذف نشود`}؟</span>
      <IconLink icon={arrowLeftIcon} className={forVM ? `hide` : styles.bottom} iconAlt="arrow-left" label={t`ارتقاء حساب میزبانی`} />
    </div>
  )
}
