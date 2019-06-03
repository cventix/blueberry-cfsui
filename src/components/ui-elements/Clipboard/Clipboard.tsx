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
  url?: any
}

export const ClipBoard = ({ onClick, placeholder }: Iprops) => {
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = placeholder
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  return (
    <div className={styles.clipboard}>
      <TextInput value={placeholder} onClick={copyToClipboard}/>
      <Button onClick={copyToClipboard}>
        <span className={styles.copy}>کپی کن</span>
      </Button>
    </div>
  )
}
