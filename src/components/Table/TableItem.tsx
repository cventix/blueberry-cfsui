import React, { Component } from 'react'
import { Icon } from '../ui-elements/Icon'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

//style
import styles from './Table.module.scss'

export default interface Iprops {
  checkbox?: boolean
  label: string
  name?: string
  sortable?: boolean
  onSort?: (label: string, sortType: string | undefined) => void
  sortType?: string
  className?: string | string[]
  mimetype?: any
  onCheckAll?: () => void
  checkAll?: boolean
  id?: number
  onCheck?: (id: number) => void
  handleNavigate?: (e: any) => void
  itemName?: string
  uuid?: string
  item?: any
  checked?: boolean
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
  mimetype,
  handleNavigate,
  onCheckAll,
  checked,
  itemName,
  item,
  onCheck,
  uuid
}) => {
  return (
    <td data-label={name} className={className ? splitter(className) : ' '} {...sortable && { onClick: () => onSort && onSort(label, sortType) }}>
      <div className={'rowItem'}>
        {checkbox && (
          <div className={'rowItem'}>
            <Checkbox onChange={() => (onCheckAll ? onCheckAll() : onCheck && id && onCheck(id))} checked={checked} />
          </div>
        )}
        <div
          className={'rowItem'}
          {...handleNavigate && { onClick: e => handleNavigate({ e: e, name: itemName, id: id, uuid: uuid, item: item && item.item }) }}
        >
          {mimetype && mimetype === 'image' ? (
            <Icon src={`http://cdn.persiangig.com/preview/${uuid}/medium/${name}`} className={'imageIcon icon'} />
          ) : (
            <Icon mimetype={mimetype} />
          )}
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
