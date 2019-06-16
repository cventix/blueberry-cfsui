import * as React from 'react'

import { Icon } from '../Icon'

//styles and icons
import styles from './Modal.module.scss'
import close from '../../../images/buttonIcons/icon-btn-refresh-copy.svg'

export const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

export default interface Iprops {
  children?: any
  handleClose?: () => void
  show?: boolean
  title?: string
  width?: number
}

export const Modal: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={props.show ? [styles.modal, styles.displayBlock].join(' ') : [styles.modal, styles.displayNone].join(' ')}>
      <section className={styles.modalMain} style={{ width: props.width }}>
        <div className={styles.header}>
          <span className={styles.title}>{props.title}</span>
          <button className={styles.close} onClick={props.handleClose}>
            <Icon className={styles.closeIcon} src={close} />
          </button>
        </div>
        <div className={styles.body}>
          {props.children}
        </div>
      </section>
    </div>
  )
}
