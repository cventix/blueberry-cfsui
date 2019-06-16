import * as React from 'react'

// ui-elements
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'
import toast from '../../../components/ui-elements/Toast/Toast'

// styles
import styles from './Clipboard.module.scss'

export default interface Iprops {
  placeholder: string
}

export const ClipBoard = ({ placeholder }: Iprops) => {
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = placeholder
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.succeed('کپی شد')
  }
  return (
    <div className={styles.clipboard}>
      <TextInput value={placeholder} onClick={copyToClipboard} />
      <Button onClick={copyToClipboard}>
        <span className={styles.copy}>کپی کن</span>
      </Button>
    </div>
  )
}
