import React, { Component } from 'react'
import { Icon } from '../ui-elements/Icon'

import styles from './Table.module.scss'

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
}

const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(' ')
}

export const TableItem: React.FunctionComponent<Iprops> = ({
  label,
  checkbox,
  name,
  sortable,
  onSort,
  sortType,
  className,
  hasType,
  onCheckAll,
  checkAll
}) => {
  return (
    <td data-label={name} className={className ? splitter(className) : ' '} {...sortable && { onClick: () => onSort(label, sortType) }}>
      <div className={'rowItem'}>
        {checkbox && (
          <div className={' rowItem'}>
            <input type="checkbox" onChange={onCheckAll} checked={checkAll} defaultChecked={checkAll} />
          </div>
        )}
        {hasType && <Icon mimetype={hasType} />}
        <div>{label}</div>
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
