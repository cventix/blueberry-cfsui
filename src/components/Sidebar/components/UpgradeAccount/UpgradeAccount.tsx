import * as React from 'react'

// ui-elements
import { IconLink } from '../../../ui-elements/IconLink'

// icons
import arrowLeftIcon from '../../../../images/arrow-left.svg'

// styles
import styles from './UpgradeAccount.module.scss'
import { Progressbar } from '../../../ui-elements/Progressbar/Progressbar'

export default interface Iprops {
  percent?: number
}

export const UpgradeAccount = ({ percent = 70 }: Iprops) => {
  return (
    <div className={styles.upgradeAccount}>
      <div className={styles.percent}>٪{`${percent}`} از حجم شما استفاده شده</div>
      <div className={styles.progressbar}>
        <Progressbar value={percent} height={8} color={'green'} />
      </div>
      <span className={styles.deleteQus}>می‌خواهید فایل‌هایتان حذف نشود؟</span>
      <IconLink icon={arrowLeftIcon} className={styles.bottom} iconAlt="arrow-left" label="ارتقاء حساب میزبانی" />
    </div>
  )
}
