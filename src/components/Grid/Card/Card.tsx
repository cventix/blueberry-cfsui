import React, { Component } from 'react'

import Dropdown from '../../ui-elements/Dropdown/Dropdown'
import { Icon } from '../../ui-elements/Icon'
import { Checkbox } from '../../ui-elements/Checkbox/Checkbox'
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'

//styles
import styles from './Card.module.scss'
import { navigateObject } from '../../Content/Content'

const EnhancedDropdown = enhancer(Dropdown)

export default interface Iprops {
  item?: any
  checkbox?: boolean
  checkAll?: boolean
  dropdown?: boolean
  id?: number
  onCheck?: (id: number, e: any) => void
  dropDownData?: any
  uuid?: string
  handleNavigate?: (e: navigateObject) => void
  onCheckAll?: any
  checked?: any
}

export const Card: React.FunctionComponent<Iprops> = ({
  item,
  checkbox,
  handleNavigate,
  dropdown,
  uuid,
  onCheck,
  id,
  onCheckAll,
  checked,
  dropDownData
}) => {
  console.log(onCheck)
  return (
    <div className={styles.item}>
      <div
        {...handleNavigate && { onClick: e => handleNavigate({ e: e, name: item['name'], uuid: item['uuid'], item: item }) }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={styles.type}>
          {item && item['type'] && item['type'] == 'image' ? (
            <Icon src={`http://cdn.persiangig.com/preview/${item['uuid']}/medium/${item['name']}`} className={'imageIcon icon'} />
          ) : (
            <Icon mimetype={item['type']} />
          )}
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{item['name']}</span>
          <span className={styles.date}>
            {item['created_at']} {item['size'] && item['size'] !== '---' && `,${item['size']}`}
          </span>
        </div>
      </div>
      {checkbox && (
        <Checkbox
          className={styles.checkbox}
          onChange={e => (onCheckAll ? onCheckAll() : onCheck && item['id'] && onCheck(item['id'], e))}
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
