import * as React from 'react'
import { Icon } from '../ui-elements/Icon'
import styles from './Authentication.module.scss'
import pg from '../../images/typeIcons/login/group-copy-2.svg'

export default interface Iprops {
  children?: any
  height?:number
}

export const Authentication: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={styles.fullpage} >
      <div className={styles.icon}>
        <Icon src={pg} />
      </div>
      <div className={styles.box} >{props.children}</div>
    </div>
  )
}
