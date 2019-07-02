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
      <section className={`pg-fixed pg-top-50% pg-left-50% pg-bg-white pg-h-auto pg-z-100 pg-rounded-sm pg-shadow-lg ${styles.modalMain}`} style={{ width: props.width }}>
        <div className={`flex-row-wrap pg-rounded-sm pg-justify-between pg-h-45p pg-bg-gray-100 pg-mb-23p ${styles.header}`} style={{boxShadow: '0 1px 0 0 #e5e5e5'}}>
          <span className={`flex-row-wrap pg-mr-23p pg-items-center vMedium pg-text-gray-700 ${styles.title}`}>{props.title}</span>
          <button className={`pg-cursor-pointer pg-border-0 pg-bg-transparent pg-m-11p  ${styles.close}`} onClick={props.handleClose}>
            <Icon className='pg-w-10p' src={close} />
          </button>
        </div>
        <div className='pg-pt-0 pg-pb-0 pg-pr-14p pg-pl-14p'>
          {props.children}
        </div>
      </section>
    </div>
  )
}