import React from 'react'
import { Icon } from '../ui-elements/Icon'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

//style
import styles from './Table.module.scss'

//interface
import { ITableItem } from '../Content/ContentBody'

export default interface Iprops {
  checkbox?: boolean
  label: string
  name?: string
  sortable?: boolean
  sortType?: string
  className?: string | string[]
  mimetype?: string 
  itemName?: string
  uuid?: string
  item?: ITableItem
  checked?: any
  checkAll?: boolean
  id?: number
  onCheckAll?: () => void
  onSort?: (label: string, sortType: string | undefined) => void
  onCheck?: (id: number, e?: any) => void
  handleNavigate?: (e: any) => void
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
  let imgSrc = item && `http://cdn.persiangig.com/preview/${uuid}/medium/${item.name}`
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
          {mimetype && mimetype === 'image' ? <Icon src={imgSrc} className={'imageIcon icon'} /> : <Icon mimetype={mimetype} />}
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
