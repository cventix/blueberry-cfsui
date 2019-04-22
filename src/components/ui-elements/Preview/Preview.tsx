import * as React from 'react'

import modalStyles from '../Modal/Modal.module.scss'
import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import closeIcon from '../../../images/buttonIcons/icon-close.svg'
import arrowLeft from '../../../images/arrow-left-white.svg'
import zoomIn from '../../../images/buttonIcons/zoom-in.svg'
import zoomOut from '../../../images/buttonIcons/zoom-out.svg'

import styles from './Preview.module.scss'

export const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

export default interface Iprops {
  children?: any
  handleClose?: () => void
  show?: boolean
  fileName?: string
  type?: string
}

export const Preview: React.FunctionComponent<Iprops> = props => {
  let content
  switch (props.type) {
    case 'img':
      content = 'image'
      break
    case 'code':
      content = 'code'
      break
    case 'music':
      content = 'music'
      break
    case 'video':
      content = 'video'
      break
  }

  return (
    <div className={props.show ? [modalStyles.modal, modalStyles.displayBlock].join(' ') : [modalStyles.modal, modalStyles.displayNone].join(' ')}>
      <div className={styles.previewBox}>
        <div className={styles.header}>
          <span className={styles.fileName}>{props.fileName}</span>
          <Button className={['btnControl', 'btnSm']} onClick={props.handleClose}>
            <Icon src={closeIcon} className={styles.icon} /> <span className={styles.text}>بستن</span>
          </Button>
        </div>
        <div className={styles.arrows}>
          <Button className={['btnControl', 'btnCircle']}>
            <Icon src={arrowLeft} className={[styles.icon, styles.iconRight].join(' ')} />
          </Button>
          <section className={[modalStyles.modalMain, styles.previewMain].join(' ')}>
            <div>{props.children}</div>
          </section>
          <Button className={['btnControl', 'btnCircle']}>
            <Icon src={arrowLeft} className={styles.icon} />
          </Button>
        </div>
        {content === 'image' && (
          <div className={styles.bottomBar}>
            <Button className={['btnControl', 'btnLg', 'btnCircle']} style={{ height: 50 }}>
              <Icon src={arrowLeft} className={styles.icon} />
              تمام صفحه
              <Icon src={zoomOut} className={styles.icon} />
              59%
              <Icon src={zoomIn} className={styles.icon} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
