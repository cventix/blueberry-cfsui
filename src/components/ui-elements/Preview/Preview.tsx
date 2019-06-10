import * as React from 'react'

import modalStyles from '../Modal/Modal.module.scss'
import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import closeIcon from '../../../images/buttonIcons/icon-close.svg'
import arrowLeft from '../../../images/arrow-left-white.svg'
import bigger from '../../../images/icon-fullscreen.svg'
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
  item?: any
  type?: string
  onDownloadFile?: any
  goTo: (e: number) => void
}

import DownloadBarImage from './DownloadBar/DownlaodBarImage'

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
    <div className={props.show ? [styles.modal, styles.displayBlock].join(' ') : [styles.modal, styles.displayNone].join(' ')}>
      <div className={styles.previewBox}>
        <div className={styles.header}>
          <span className={styles.fileName}>{props.item.name}</span>
          <Button className={['btnControl', 'btnSm']} onClick={props.handleClose}>
            <Icon src={closeIcon} className={styles.icon} /> <span className={styles.text}>بستن</span>
          </Button>
        </div>
        <div className={styles.previewBody}>
          <div className={styles.arrows}>
            <Button className={['btnControl', 'btnCircle','right']} onClick={() => props.goTo(+1)}>
              <Icon src={arrowLeft} className={[styles.icon, styles.iconRight].join(' ')} />
            </Button>
            <section className={[modalStyles.modalMain, styles.previewMain].join(' ')}>
              <div className={styles.image}>{props.children}</div>
            </section>
            <Button className={['btnControl', 'btnCircle','left']} onClick={() => props.goTo(-1)}>
              <Icon src={arrowLeft} className={styles.icon} />
            </Button>
          </div>

          {/* {content === 'image' && (
            <div className={styles.bottomBar}>
              <Button className={['btnControl', 'btnLg', 'btnCircle']} style={{ height: 50 }}>
                <div className={styles.row}>
                  <Icon src={bigger} className={styles.icon} />
                  تمام صفحه
                  <div className={localStorage.getItem('__language') == 'fa' ? styles.marginRight : styles.marginleft}>
                    <Icon src={zoomOut} className={styles.icon} />
                    59%
                    <Icon src={zoomIn} className={styles.icon} />
                  </div>
                </div>
              </Button>
            </div>
          )} */}
          <DownloadBarImage onItemClick={props.onDownloadFile} />
        </div>
      </div>
    </div>
  )
}
