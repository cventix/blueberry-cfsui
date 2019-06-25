import * as React from 'react'

import DropdownItem from './DropdownItem'

import styles from './Dropdown.module.scss'
import buttonStyles from '../Button/Button.module.scss'

import { Icon } from '../Icon'

import bigger from '../../../images/bigger.1.svg'

interface Iprops {
  isOpen: boolean
  onToggle?: () => void
  data?: object[]
  isSelected?: number
  onSelect?: () => void
  width?: number
  noButton?: boolean
  position?: any
  id?: number
  selectable?: boolean
  fileType?: string
  buttonDropDown?: boolean
  marginLeft?: number
  bordered?: boolean
}

export const Dropdown: React.FunctionComponent<Iprops> = ({
  data,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
  width,
  noButton,
  fileType,
  selectable,
  id,
  bordered,
  children,
  marginLeft,
  buttonDropDown,
  position = 'absolute'
}) => {

  return (
    <div className={styles.dropdownBox}>
      {children
        ? children
        : !noButton && (
            <button onClick={onToggle} className={styles.dpButton}>
              <div className={styles.more} />
            </button>
          )}
      {children
        ? children
        : buttonDropDown && (
            <span onClick={onToggle} className={buttonStyles.caretSpan}>
              <Icon src={bigger} />
            </span>
          )}
      {isOpen && (
        <ul className={position ? [styles[position], styles.dropdown].join(' ') : styles.dropdown} style={{ width: width, marginLeft: marginLeft }}>
          {data &&
            data.map((item: any, i: number) => {
              if ((fileType === 'D' && item.label !== 'دانلود فایل') || fileType === 'F' || !fileType)
                return (
                  <DropdownItem
                    label={item.label}
                    index={i}
                    selectable={selectable}
                    key={i}
                    id={id}
                    bordered={bordered}
                    isSelected={isSelected}
                    onSelect={onSelect}
                    onClick={item.onClick}
                    {...item.description && { description: item.description }}
                  />
                )
            })}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
