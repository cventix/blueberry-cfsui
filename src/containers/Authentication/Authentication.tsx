import * as React from 'react'

// ui-elements
import { LangSwitcher } from '../../components/ui-elements/LangSwitcher/LangSwitcher'
import { Icon } from '../../components/ui-elements/Icon'

// icons & styles
import pg from '../../images/typeIcons/login/logo-with-text.svg'
import styles from './Authentication.module.scss'

export default interface Iprops {
  children?: any
  height?:number
}

export const Authentication: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={styles.wrapper}>
      <Icon src={pg} className={styles.logo}/>
      <div className={styles.mainBox}>{props.children}</div>
      <LangSwitcher />
    </div>
  )
}
