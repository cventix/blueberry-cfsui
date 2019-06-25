import React, { Component } from 'react'

// ui-elements
import { EnhanceDropdown as enhancer } from '../../ui-elements/Dropdown/EnhanceDropdown'
import { Checkbox } from '../../ui-elements/Checkbox/Checkbox'
import Dropdown from '../../ui-elements/Dropdown/Dropdown'
import { navigateObject } from '../../Content/Content'
import { Icon } from '../../ui-elements/Icon'

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
  let imgSrc = `http://cdn.persiangig.com/preview/${item['uuid']}/medium/${item['name']}`
  return (
    <div className={`pg-flex-col pg-flex-no-wrap flex-center pg-relative pg-min-w-10p
      pg-cursor-pointer pg-bg-white pg-mt-8 pg-mr-0 pg-mb-0 pg-ml-8 pg-min-h-10p
      pg-shadow-md pg-rounded-vsm ${styles.item}`}>
      <div
        {...handleNavigate && { onClick: e => handleNavigate({ e: e, name: item.name, uuid: item.uuid, item: item }) }}
        className="flex-center pg-flex-col"
      >
        <div className={styles.type}>
          {item && item.type && item.type == 'image' ? <Icon src={imgSrc} className={'imageIcon icon'} /> : <Icon mimetype={item.type} />}
        </div>
        <div className="flex-center pg-flex-col pg-mt-13p">
          <span className="pg-justify-center pg-truncate pg-text-gray-800 pg-w-100p flex-row-nowrap" style={{direction: 'rtl'}}>{item['name']}</span>
          <span className="pg-font-vLight pg-text-10p pg-text-gray-700 pg-mb-3p">
            {item.created_at} {item.size && item.size !== '---' && `,${item.size}`}
          </span>
        </div>
      </div>
      {checkbox && (
        <Checkbox
          className="pg-absolute pg-right-10p pg-bottom-10p"
          onChange={() => (onCheckAll ? onCheckAll() : onCheck && item.id && onCheck(item.id))}
          checked={checked}
        />
      )}

      {dropdown && (
        <div className="pg-absolute pg-left-10p pg-bottom-10p">
          <EnhancedDropdown data={dropDownData} id={item.id} />
        </div>
      )}
    </div>
  )
}
