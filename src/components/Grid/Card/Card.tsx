import React, { Component } from 'react'

import Dropdown from '../../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'
import { Icon } from '../../ui-elements/Icon'
import { formatBytes } from '../../../services/internal/utils/formatBytes'

import styles from './Card.module.scss'

const EnhancedDropdown = enhancer(Dropdown)

export default interface Iprops {
  item?: any
  checkbox?: boolean
  checkAll?: boolean
  dropdown?: boolean
}

export const Card: React.FunctionComponent<Iprops> = ({ item, checkbox, dropdown, checkAll }) => {
  return (
    <div className={styles.item}>
      <div className={styles.type}>{item && item['type'] && <Icon mimetype={item['type']} />}</div>
      <div className={styles.info}>
        <span>{item['نام']}</span>
        <span className={styles.date}>
          {item['تاریخ']} ,{formatBytes(item['حجم'])}
        </span>
      </div>
      {checkbox && (
        <div className={styles.checkbox}>
          <input type="checkbox" checked={checkAll} />
        </div>
      )}
      {dropdown && (
        <div className={styles.dropdown}>
          <EnhancedDropdown data={['option one', 'option two', 'option three']} />
        </div>
      )}
    </div>
  )
}
