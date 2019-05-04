import React, { Component } from 'react'
import { Icon } from '../ui-elements/Icon'

import styles from './Table.module.scss'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

export default interface Iprops {
  checkbox?: boolean
  label: string
  name?: string
  sortable?: boolean
  onSort?: any
  sortType?: string
  className?: any
  hasType?: any
  onCheckAll?: any
  checkAll?: boolean
  id?: number
  onCheck?: (id: number) => void
  handleNavigate?: any
  itemName?: string
  stopPropagation?: any
}

export const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

export const TableItem: React.FunctionComponent<Iprops> = ({
  label,
  checkbox,
  name,
  sortable,
  onSort,
  id,
  sortType,
  className,
  hasType,
  handleNavigate,
  onCheckAll,
  checkAll,
  itemName,
  onCheck,
  
}) => {
  return (
    <td data-label={name} className={className ? splitter(className) : ' '} {...sortable && { onClick: () => onSort(label, sortType) }}>
      <div className={'rowItem'}>
        {checkbox && (
          <div className={' rowItem'}>
            <Checkbox onChange={() => onCheck && id && onCheck(id)} checked={checkAll}/>
          </div>
        )}
        <div className={'rowItem'} {...handleNavigate && { onClick: e => handleNavigate(e, itemName, id) }}>
          {hasType && <Icon mimetype={hasType} />}
          <div className={styles.name}>{label}</div>
        </div>
        {sortable && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
    </td>
  )
}
