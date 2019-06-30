import * as React from 'react'

// ui-elements
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'
import Dropdown from '../Dropdown/Dropdown'
import { Icon } from '../Icon'

// styles
import bigger from '../../../images/bigger.1.svg'
import styles from './Button.module.scss'

const EnhancedDropdown = enhancer(Dropdown)

export default interface Iprops {
  className?: string[]
  onClick?: (e: React.SyntheticEvent) => void
  style?: object
  children?: any
  data?: object
  disabled?: boolean
}

const classCreator = (className: any) => {
  return className.map((name: any) => styles[name]).join(' ')
}

export const DropDownButton = ({ className, onClick, style, data, children, disabled }: Iprops) => {
  return (
    <button
      disabled={disabled}
      className={className ? `pg-btn ${styles.dropdown} ${classCreator(className)}` : `${styles.dropdown} pg-btn`}
      {...onClick && { onClick: e => onClick(e) }}
      style={style}
    >
      {children}
      <div className={!disabled ? styles.leftie : [styles.leftie, styles.disable].join(' ')}>
        <EnhancedDropdown width={200} marginLeft={10} buttonDropDown={true} noButton={true} data={data}  />
      </div>
    </button>
  )
}
