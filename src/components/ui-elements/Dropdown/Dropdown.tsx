import * as React from 'react'

import DropdownItem from './DropdownItem'

import styles from './Dropdown.module.scss'

interface Iprops {
  isOpen: boolean
  onToggle?: () => void
  data?: string[]
  isSelected?: number
  onSelect?: () => void
  width?: number
}

export const Dropdown: React.FunctionComponent<Iprops> = ({ data, isOpen, onToggle, isSelected, onSelect, width }) => {
  return (
    <div className={styles.dropdownBox}>
      <button onClick={onToggle} className={styles.dpButton}>
        <div className={styles.more} />
      </button>
      {isOpen && (
        <ul className={styles.dropdown} style={{ width: width }}>
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
