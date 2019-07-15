import * as React from 'react'

import modalStyles from '../Modal/Modal.module.scss'
import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import closeIcon from '../../../images/buttonIcons/icon-close.svg'
import arrowLeft from '../../../images/arrow-left-white.svg'
import bigger from '../../../images/icon-fullscreen.svg'
import zoomIn from '../../../images/buttonIcons/zoom-in.svg'
import zoomOut from '../../../images/buttonIcons/zoom-out.svg'
import Fullscreen from 'react-full-screen'

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
import { ZoomBar } from '../../ZoomBar/ZoomBar'

export const Preview: React.FunctionComponent<Iprops> = props => {

  const [isFull, setFull] = React.useState(false)
  return (
    <div className={props.show ? [styles.modal, styles.displayBlock].join(' ') : [styles.modal, styles.displayNone].join(' ')}>
      <div className={styles.previewBox}>
        <div className={styles.header}>
          <span className={styles.fileName}>{props.item.name}</span>
          <Button className={['pg-btnControl', 'pg-btnSm']} onClick={props.handleClose}>
            <Icon src={closeIcon} className={styles.icon} /> <span className={styles.text}>بستن</span>
          </Button>
        </div>
        <div className={styles.previewBody}>
          <div className={styles.arrows}>
            <Button className={['pg-btnControl', 'pg-btnCircle', 'pg-right', 'pg-rounded-full']} onClick={() => props.goTo(+1)}>
              <Icon src={arrowLeft} className={[styles.icon, styles.iconRight].join(' ')} />
            </Button>
            <section className={[modalStyles.modalMain, styles.previewMain].join(' ')}>
              <Fullscreen enabled={isFull}>
                <div className={styles.image}>{props.children}</div>
              </Fullscreen>
            </section>
            <Button className={['pg-btnControl', 'pg-btnCircle', 'pg-left', 'pg-rounded-full']} onClick={() => props.goTo(-1)}>
              <Icon src={arrowLeft} className={styles.icon} />
            </Button>
          </div>

          {props.item.genericType === 'image' && <ZoomBar setFull={setFull} />}
          <DownloadBarImage onItemClick={props.onDownloadFile} />
        </div>
      </div>
    </div>
  )
}
