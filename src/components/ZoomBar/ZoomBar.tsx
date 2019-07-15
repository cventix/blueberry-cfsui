import * as React from 'react'

import { Button } from '../ui-elements/Button/Button'
import { Icon } from '../ui-elements/Icon'

import bigger from '../../images/icon-fullscreen.svg'
import zoomIn from '../../images/buttonIcons/zoom-in.svg'
import zoomOut from '../../images/buttonIcons/zoom-out.svg'

import styles from '../ui-elements/Preview/Preview.module.scss'

export default interface Iprops {
  setFull: any
}

export const ZoomBar: React.FunctionComponent<Iprops> = props => {
  const [zoom, setZoom] = React.useState(100)
  function zoomin() {
    let myImg = document.getElementById('map')
    let currWidth
    if (myImg) {
      currWidth = myImg.clientWidth

      myImg.style.width = currWidth + 100 + 'px'
    }
    if (zoom < 100) setZoom(zoom + 10)
  }
  function zoomout() {
    let myImg = document.getElementById('map')
    let currWidth = myImg && myImg.clientWidth
    if (currWidth == 100) return false
    else {
      if (myImg && currWidth) myImg.style.width = currWidth - 100 + 'px'
    }
    setZoom(zoom - 10)
  }

  return (
    <div className={styles.bottomBar}>
      <Button className={['pg-btnControl', 'pg-btnLg', 'pg-btnCircle', 'pg-flex', 'pg-justify-around']} style={{ height: 50 }}>
        <div className={`${styles.row} pg-flex pg-w-full pg-justify-around`}>
          <div onClick={() => props.setFull(true)}>
            <Icon src={bigger} className={styles.icon} />
            تمام صفحه
          </div>
          <div className={`${localStorage.getItem('__language') == 'fa' ? styles.marginRight : styles.marginleft} pg-flex`}>
            <div onClick={zoomout}>
              <Icon src={zoomOut} className={styles.icon} />
            </div>
            {zoom}%
            <div onClick={zoomin}>
              <Icon src={zoomIn} className={styles.icon} />
            </div>
          </div>
        </div>
      </Button>
    </div>
  )
}
