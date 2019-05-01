import React, { Component } from 'react'

import Dropdown from '../../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'
import { Icon } from '../../ui-elements/Icon'
import { formatBytes } from '../../../services/internal/utils/formatBytes'
import { Checkbox } from '../../ui-elements/Checkbox/Checkbox'

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
        <span>{item['name']}</span>
        <span className={styles.date}>
          {item['created_at']} {item['size'] && item['size'] !== '---' && `,${item['size']}`}
        </span>
      </div>
      {checkbox && <Checkbox checked={checkAll} className={styles.checkbox} />}
      {dropdown && (
        <div className={styles.dropdown}>
          <EnhancedDropdown data={[
                        { label: 'عمومی', description: 'فایل در موتور های جستجو و صفحات پرشین گیگ نمایش داده می شود' },
                        { label: 'با لینک' },
                        { label: 'خصوصی' },
                      ]} />
        </div>
      )}
    </div>
  )
}
