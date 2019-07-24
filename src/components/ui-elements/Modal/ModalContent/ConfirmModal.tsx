import * as React from 'react'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolder.module.scss'
import { Modal } from '../Modal';

interface Iprops {
  value?: string
  text?: string
  handleSubmit?: any
  changeHandler?: any
}

export const ConfirmModal: React.FunctionComponent<Iprops> = ({ value,text, handleSubmit, changeHandler }) => {
  return (
  
      <form onSubmit={handleSubmit}>
      {text}
        <div className={styles.submitButton}>
          <Button className={['pg-btnPrimary', 'pg-btnSm']}>بلی</Button>
        </div>
      </form>
   
  )
}
