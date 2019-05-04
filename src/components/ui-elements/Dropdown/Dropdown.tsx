import * as React from 'react'

import DropdownItem from './DropdownItem'

import styles from './Dropdown.module.scss'

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
}

export const Dropdown: React.FunctionComponent<Iprops> = ({
  data,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
  width,
  noButton,
  selectable,
  id,
  children,
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

      {isOpen && (
        <ul className={position ? [styles[position], styles.dropdown].join(' ') : styles.dropdown} style={{ width: width }}>
          {data &&
            data.map((item: any, i: number) => {
              return (
                <DropdownItem
                  label={item.label}
                  index={i}
                  selectable={selectable}
                  key={i}
                  id={id}
                  bordered={false}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  {...item.onClick && { onClick: ()=>item.onClick(id) }}
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
