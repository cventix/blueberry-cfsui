import React, { Component } from 'react'

import { TableHeader } from './TableHeader'
import { TableItem } from './TableItem'
import Dropdown from '../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../ui-elements/Dropdown/EnhanceDropdown'

import styles from './Table.module.scss'
import { Link } from 'react-router-dom'

const EnhancedDropdown = enhancer(Dropdown)

export default interface Iprops {
  table?: object[]
  dropdown?: boolean
  onCheckAll?: () => void
  checkAll?: boolean
  onSort?: any
  tabletView?: boolean
  onSelect?: (option: number) => void
  onRenameDocument?: (e: any) => void
  handleNavigate?: any
  optionSelected?: number
  position?: any
  dropDownData?: any
  onCheck?: any
}
export const Table: React.FunctionComponent<Iprops> = ({
  table,
  dropdown,
  onCheckAll,
  checkAll,
  onSort,
  tabletView,
  onSelect,
  dropDownData,
  handleNavigate,
  optionSelected,
  onCheck
}) => {
  const header = ['نام', 'مالک', 'تاریخ', 'حجم']
  console.log(table && table.length)
  return table && table.length > 0 ? (
    <table className={styles.table}>
      <TableHeader
        titles={header}
        dropdown={dropdown}
        {...onCheckAll && { checkAll: checkAll, onCheckAll: onCheckAll }}
        onSort={onSort}
        tabletView={tabletView}
      />
      <tbody>
        {table &&
          table.map((item: any, i: number) => {
            return (
              <tr key={i}>
                {Object.keys(item).map((k, i) => {
                  if (k !== 'type' && k !== 'id' && k !== 'fullPath' && k !== 'discriminator') {
                    return (
                      <TableItem
                        name={k}
                        key={item}
                        id={item.id}
                        handleNavigate={k === 'name' && handleNavigate}
                        label={item[k]}
                        itemName={item.name}
                        onCheck={onCheck}
                        checkAll={checkAll}
                        className={k === 'name' ? ['show'] : [' ']}
                        checkbox={k === 'name' ? true : false}
                        hasType={k === 'name' && item['type']}
                      />
                    )
                  }
                })}
                {dropdown && (
                  <td className={[styles.show, styles.left].join(' ')}>
                    <EnhancedDropdown
                      width={138}
                      optionSelected={optionSelected}
                      onSelect={onSelect}
                      position={'absoulte'}
                      data={dropDownData && dropDownData}
                      id={item.id}
                    />
                  </td>
                )}
              </tr>
            )
          })}
      </tbody>
    </table>
  ) : (
    <div>داده ای وجود ندارد</div>
  )
}
