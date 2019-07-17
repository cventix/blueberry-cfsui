import React, { Component } from 'react'

import Dropdown from '../../ui-elements/Dropdown/Dropdown'
import { Icon } from '../../ui-elements/Icon'
import { Checkbox } from '../../ui-elements/Checkbox/Checkbox'
import { navigateObject } from '../../Content/Content'
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'

//interface
import { ITableItem } from '../../Content/ContentBody'
//styles
import styles from './Card.module.scss'

const EnhancedDropdown = enhancer(Dropdown)

export default interface Iprops {
  item: ITableItem
  checkbox?: boolean
  dropdown?: boolean
  id?: number
  dropDownData?: any
  uuid?: string
  checked?: boolean
  onCheckAll?: () => void
  onCheck?: (id: number, e?: any) => void
  handleNavigate?: (e: navigateObject) => void
}

export const Card: React.FunctionComponent<Iprops> = ({ item, checkbox, handleNavigate, dropdown, onCheck, onCheckAll, checked, dropDownData }) => {
  let imgSrc = `${process.env.REACT_APP_URL}/preview/${item['uuid']}/medium/${item['name']}`
  return (
    <div className={styles.item}>
      <div
        {...handleNavigate && { onClick: e => handleNavigate({ e: e, name: item.name, uuid: item.uuid, item: item }) }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={styles.type}>
          {item && item.type && item.type == 'image' ? <Icon src={imgSrc} className={'imageIcon icon'} /> : <Icon mimetype={item.type} />}
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{item['name']}</span>
          <span className={styles.date}>
            {item.created_at} {item.size && item.size !== '---' && `,${item.size}`}
          </span>
        </div>
      </div>
      {checkbox && (
        <Checkbox
          className={styles.checkbox}
          onChange={() => (onCheckAll ? onCheckAll() : onCheck && item.id && onCheck(item.id))}
          checked={checked}
        />
      )}

      {dropdown && (
        <div className={styles.dropdown}>
          <EnhancedDropdown data={dropDownData} id={item.id} />
        </div>
      )}
    </div>
  )
}
