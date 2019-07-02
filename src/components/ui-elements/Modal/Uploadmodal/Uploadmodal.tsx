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
      <div className='flex-center pg-flex-col pg-text-gray-800 pg-mt-45p'>
        <div>
          <span>{formDescription}</span>
        </div>
        <div className={flexDirection && flexDirection==='column' ? 'flex-center pg-flex-col pg-flex-wrap pg-w-80% pg-mt-15p pg-ml-0 pg-mr-0 pg-mb-12' : 'flex-center pg-flex-row pg-flex-wrap pg-w-80% pg-mt-15p pg-ml-0 pg-mr-0 pg-mb-12' }>{children}</div>
      </div>
    </Modal>
  )
}



