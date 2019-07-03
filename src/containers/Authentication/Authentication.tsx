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
    <div className={`flex-center pg-flex-col pg-flex-no-wrap pg-h-screen ${styles.wrapper}`}>
      <Icon src={pg} className={`pg-mb-30p pg-w-227p ${styles.logo}`}/>
      <div className={`pg-w-500p pg-pt-45p pg-pr-100p pg-pb-38p pg-pl-100p
      	pg-mb-21p pg-bg-white pg-text-center pg-rounded-sm pg-shadow 
      	tablet-max:pg-w-300p tablet-max:pg-pt-30p tablet-max:pg-pr-0 
      	tablet-max:pg-pb-38p tablet-max:pg-pl-0 tablet-max:pg-bg-transparent tablet-max:pg-shadow-none 
      	${styles.mainBox}`}>{props.children}</div>
      <LangSwitcher />
    </div>
  )
}