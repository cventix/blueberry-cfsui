import * as React from 'react'
import { Modal } from '../Modal/Modal'
import { ClipBoard } from '../Clipboard/Clipboard'
import Dropdown from '../Dropdown/Dropdown'

import styles from './Sharemodal.module.scss'

export default interface Iprops {
  show?: boolean
  title?: string
  width?: number
}
export const ShareModal: React.FunctionComponent<Iprops> = ({ show, title, width }) => {
  return (
    <Modal show={show} title={title} width={width}>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.textBox}>
            <span className={styles.text}>لینک اشتراک گذاری</span>
            <span className={styles.subText}> لینک به صفحه نمایش محتویات این فولدر</span>
          </div>
          <div className={styles.clipBoard}>
            <ClipBoard />
          </div>
          <div className={styles.dropdown}>
            <Dropdown
              isOpen={true}
              noButton={true}
              isSelected={0}
              data={[
                { label: 'عمومی', description: 'فایل در موتور های جستجو و صفحات پرشین گیگ نمایش داده می شود' },
                { label: 'با لینک' },
                { label: 'خصوصی' },
              ]}
              position={'relative'}
              width={284}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.textBox}>
            <span className={styles.text}> اشتراک‌گذاری در شبکه‌های اجتماعی </span>
            <span className={styles.subText}> لینک به صفحه نمایش محتویات این فولدر</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
