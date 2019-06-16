import * as React from 'react'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolderModal/CreateFolder.module.scss'

interface Iprops {
  value?: string
  handleSubmit?: (e: any) => void
  changeHandler?: (e: any) => void
}

export const RenameFile: React.FunctionComponent<Iprops> = ({ value, handleSubmit, changeHandler }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput value={value} style={{ width: 300 }} onChange={changeHandler} name={'renameInput'} />
      <div className={styles.submitButton}>
        <Button className={['btnPrimary100', 'btnSm']}>تغییر نام</Button>
      </div>
    </form>
  )
}
