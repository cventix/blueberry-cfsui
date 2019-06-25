import * as React from 'react'
import { Modal } from '../Modal'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from './Uploadmodal.module.scss'

export default interface Iprops {
  show?: boolean
  title?: string
  width?: number
  formDescription?: string
  children?: any
  flexDirection?:string
  handleClose?: () => void
}

export const UploadModal: React.FunctionComponent<Iprops> = ({ show, title, formDescription, width, handleClose, children,flexDirection }) => {
  return (
    <Modal show={show} title={title} width={width} handleClose={handleClose}>
      <div className={styles.uploadModal}>
        <div>
          <span>{formDescription}</span>
        </div>
        <div className={flexDirection && flexDirection==='column' ? styles.column :styles.row}>{children}</div>
      </div>
    </Modal>
  )
}
