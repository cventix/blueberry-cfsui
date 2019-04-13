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
}
export const Table: React.FunctionComponent<Iprops> = ({ table, dropdown, onCheckAll, checkAll, onSort }) => {
  return (
    <table className={styles.table}>
      <TableHeader titles={table && table[0]} dropdown={dropdown} {...onCheckAll && { checkAll: checkAll, onCheckAll: onCheckAll }} onSort={onSort} />
      <tbody>
        {table &&
          table.map((item: any, i: any) => {
            return (
              <tr key={i}>
                {Object.keys(item).map((k, i) => {
                  if (k !== 'type') {
                    return (
                      <TableItem
                        name={k}
                        key={i}
                        label={item[k]}
                        checkAll={checkAll}
                        className={k === 'نام' ? ['show'] : [' ']}
                        checkbox={k === 'نام' ? true : false}
                        hasType={k === 'نام' && item['type']}
                      />
                    )
                  }
                })}
                {dropdown && (
                  <td className={[styles.show, styles.left].join(' ')}>
                    <EnhancedDropdown data={['one', 'two', 'three']} />
                  </td>
                )}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
