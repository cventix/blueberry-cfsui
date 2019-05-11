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
  dropDownData?: any
  handleNavigate?: (e: navigateObject) => void
}

export const Card: React.FunctionComponent<Iprops> = ({ item, checkbox, handleNavigate, dropdown, checkAll, dropDownData }) => {
  return (
    <div className={styles.item}  {...handleNavigate && { onClick: (e) => handleNavigate({ e: e, name: item['name'] }) }}>
      <div className={styles.type}>{item && item['type'] && <Icon mimetype={item['type']} />}</div>
      <div className={styles.info}>
        <span className={styles.name}>{item['name']}</span>
        <span className={styles.date}>
          {item['created_at']} {item['size'] && item['size'] !== '---' && `,${item['size']}`}
        </span>
      </div>
      {checkbox && <Checkbox checked={checkAll} className={styles.checkbox} />}
      {dropdown && (
        <div className={styles.dropdown}>
          <EnhancedDropdown data={dropDownData} id={item.id} />
        </div>
      )}
    </div>
  )
}
