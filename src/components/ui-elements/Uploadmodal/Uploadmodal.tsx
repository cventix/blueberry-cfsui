import * as React from 'react'
import { Modal } from '../Modal/Modal'
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'

import styles from './Uploadmodal.module.scss'

export default interface Iprops {
  show?: boolean
  title?: string
  width?: number
  formDescription?: string
  children?: any
  handleClose?: () => void
}

export const UploadModal: React.FunctionComponent<Iprops> = ({ show, title, formDescription, width, handleClose, children }) => {
  return (
    <Modal show={show} title={title} width={width} handleClose={handleClose}>
      <div className={styles.uploadModal}>
        <div>
          <span>{formDescription}</span>
        </div>
        <div className={styles.row}>{children}</div>
      </div>
    </Modal>
  )
}
