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
}

export const Dropdown: React.FunctionComponent<Iprops> = ({
  data,
  isOpen,
  onToggle,
  isSelected,
  onSelect,
  width,
  noButton,
  children,
  position = 'absolute',
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
                  selectable={true}
                  key={i}
                  bordered={true}
                  isSelected={isSelected}
                  onSelect={onSelect}
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
