// TODO: copy to clipboard in onclick
// TODO: when copied add done class to span

import * as React from 'react'

// ui-elements
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'

// styles
import styles from './Clipboard.module.scss'

export default interface Iprops {
  onClick?: any
  placeholder: string
}

export const ClipBoard = ({ onClick, placeholder }: Iprops) => {
  return (
    <div className={styles.clipboard}>
      <TextInput placeholder={placeholder} />
      <Button onClick={onClick}>
        <span className={styles.copy}>کپی کن</span>
      </Button>
    </div>
  )
}
