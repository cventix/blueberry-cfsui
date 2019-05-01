import * as React from 'react'

import styles from './Dropdown.module.scss'

interface Iprops {
  label: string
  link?: string
  index: number
  isSelected?: number
  onSelect?: (option: number) => void
  onClickdescription?: string
  selectable?: boolean
  bordered?: boolean
  onClick?: (id: number) => void
  description?: string
  id?: number
}

export const DropdownItem: React.FunctionComponent<Iprops> = ({
  label,
  link,
  index,
  onSelect,
  isSelected,
  selectable,
  description,
  onClick,
  bordered,
  id
}) => {
  let liClassName
  if (bordered) {
    liClassName = styles.bordered
  }
  if (isSelected === index) {
    liClassName += ' ' + styles.selected
  }
console.log(id)
  return (
    <li className={liClassName} onClick={() => (onClick && id && onClick(id) ? onClick(id) : onSelect && onSelect(index))}>
      <a href={link}>
        <p className={styles.label}>
          {selectable && isSelected === index && <span className={styles.checkmark} />}
          <span className={selectable ? styles.text : ' '}>{label}</span>
        </p>
        <p className={[styles.description, selectable ? styles.text : ' '].join(' ')}>{description}</p>
      </a>
    </li>
  )
}

export default DropdownItem
