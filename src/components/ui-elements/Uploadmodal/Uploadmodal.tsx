import * as React from 'react'
import { Modal } from '../Modal/Modal'
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'

import styles from './Uploadmodal.module.scss'

export default interface Iprops {
  show?: boolean
  title?: string
  width?: number
}

export const UploadModal: React.FunctionComponent<Iprops> = ({ show, title, width }) => {
  return (
    <Modal show={show} title={title} width={width}>
      <div className={styles.uploadModal}>
        <div>
          <span>برای آپلود آدرس اینترنتی خود را در فرم زیر وارد نمایید</span>
        </div>
        <div className={styles.row}>
          <TextInput placeholder={'http://example.com'} style={{ width: 425 }} />
          <Button className={['btnPrimary0', 'btnSm']}>آپلود</Button>
        </div>
      </div>
    </Modal>
  )
}
