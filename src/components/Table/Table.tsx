import React, { Component } from 'react'

import { TableHeader } from './TableHeader'
import { TableItem } from './TableItem'
import Dropdown from '../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../ui-elements/Dropdown/EnhanceDropdown'

import styles from './Table.module.scss'

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
  optionSelected?: number
  position?: any
  dropDownData?: any
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
  optionSelected
}) => {
  return (
    <table className={styles.table}>
      <TableHeader
        titles={table && table[0]}
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
                  if (k !== 'type' && k !== 'id') {
                    return (
                      <TableItem
                        name={k}
                        key={i}
                        label={item[k]}
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
  )
}
