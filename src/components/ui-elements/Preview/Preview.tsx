import * as React from 'react'

// ui-elements
import { Button } from '../Button/Button'
import { Icon } from '../Icon'

// icons & styles
import closeIcon from '../../../images/buttonIcons/icon-close.svg'
import zoomOut from '../../../images/buttonIcons/zoom-out.svg'
import zoomIn from '../../../images/buttonIcons/zoom-in.svg'
import arrowLeft from '../../../images/arrow-left-white.svg'
import bigger from '../../../images/icon-fullscreen.svg'
import modalStyles from '../Modal/Modal.module.scss'
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
      <div className={`flex-center pg-flex-col pg-relative pg-mt-70p pg-mr-260p tablet-max:pg-mr-0  ${styles.previewBox}`}>
        <div className={`flex-row-wrap-withspace pg-items-center pg-h-83p pg-w-full pg-pt-0 pg-pb-0 pg-pr-30p pg-pl-30p ${styles.header}`}>
          <span className='pg-text-white pg-text-base'>{props.item.name}</span>
          <Button className={['pg-btnControl', 'pg-btnSm']} onClick={props.handleClose}>
            <Icon src={closeIcon} className={styles.icon} /> <span className={styles.text}>بستن</span>
          </Button>
        </div>
        <div className='pg-w-full pg-h-full flex-center pg-flex-col pg-overflow-hidden tablet-max:pg-shadow-lg pg-bg-white pg-m-10p pg-w-80%'>
          <div className={`flex-center pg-w-full tablet-max:pg-h-auto ${styles.arrows}`}>
            <Button className={['pg-btnControl', 'pg-btnCircle', 'pg-right']} onClick={() => props.goTo(+1)}>
              <Icon src={arrowLeft} className={[styles.icon, styles.iconRight].join(' ')} />
            </Button>
            <section className={`pg-bg-white pg-z-100 pg-w-full pg-h-auto flex-center pg-fixed pg-top-50% pg-left-50% pg-rounded-sm pg-shadow-lg tablet-max:pg-w-full ${modalStyles.modalMain}`} {[modalStyles.modalMain, styles.previewMain].join(' ')}>
              <div className={styles.image}>{props.children}</div>
            </section>
            <Button className={['pg-btnControl', 'pg-btnCircle', 'pg-left']} onClick={() => props.goTo(-1)}>
              <Icon src={arrowLeft} className={styles.icon} />
            </Button>
          </div>

          {/* {content === 'image' && (
            <div className={`flex-row-wrap pg-justify-center ${styles.bottomBar}`}>
              <Button className={['btnControl', 'btnLg', 'btnCircle']} style={{ height: 50 }}>
                <div className='pg-flex pg-mt-0 pg-mb-0 pg-ml-1 pg-mr-1'>
                  <Icon src={bigger} className={styles.icon} />
                  تمام صفحه
                  <div className={localStorage.getItem('__language') == 'fa' ? 'pg-mr-23p' : 'pg-ml-23p'}>
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
