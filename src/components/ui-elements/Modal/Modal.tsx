import * as React from 'react'
import { Icon } from '../Icon'
import close from '../../../images/buttonIcons/icon-btn-refresh-copy.svg'

import styles from './Modal.module.scss'

export const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

export default interface Iprops {
  children?: any
  handleClose?: () => void
  show?: boolean
  title?: string
}

export const Modal: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={props.show ? [styles.modal, styles.displayBlock].join(' ') : [styles.modal, styles.displayNone].join(' ')}>
      <section className={styles.modalMain}>
        <div className={styles.header}>
          <span className={styles.title}>{props.title}</span>
          <button className={styles.close} onClick={props.handleClose}>
          <Icon className={styles.closeIcon} src={close}/>
            {/* <span className={styles.closeIcon}>+</span> */}
          </button>
        </div>

        {props.children}
      </section>
    </div>
  )
}
