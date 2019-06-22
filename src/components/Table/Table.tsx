import React, { Component } from 'react'
import { connect } from 'react-redux'

import { t } from 'ttag'

import TableHeader from './TableHeader'
import { TableItem } from './TableItem'
import Dropdown from '../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../ui-elements/Dropdown/EnhanceDropdown'

import styles from './Table.module.scss'

//interface
import { ITableItem } from '../Content/ContentBody'

const EnhancedDropdown = enhancer(Dropdown)

export interface Item {
  id?: number
  uuid?: string
  type?: string
  name?: string
  discriminator?: string
  [key: string]: any
}

export interface Iprops {
  table?: ITableItem[]
  selection: Array<number>
  dropdown?: boolean
  tabletView?: boolean
  checkAll?: boolean
  handleNavigate: any
  optionSelected?: number
  position?: string
  dropDownData?: any
  checkbox?: boolean
  itemName?: string
  activeRow?: boolean
  data?: any
  hasHeader?: boolean
  modalSelection?: number
  smPadding?: boolean
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string | undefined) => void
  onOpenCFModal?: () => void
  onSelect?: (option: number) => void
  onRenameDocument?: (e: any) => void
  onCheck?: (id: number, e?: any) => void
}

const Table: React.FunctionComponent<Iprops> = ({
  table,
  dropdown,
  onCheckAll,
  selection,
  checkAll,
  onSort,
  tabletView,
  onSelect,
  dropDownData,
  handleNavigate,
  optionSelected,
  checkbox,
  onCheck,
  modalSelection,
  smPadding = false,
  onOpenCFModal,
  hasHeader = true
}) => {
  const header = [t`نام`, t`تاریخ`, t`مالک`, t`حجم`]
  const hidden = ['type', 'id', 'fullPath', 'discriminator', 'uuid', 'item']
  return (
    <table className={styles.table}>
      {hasHeader && (
        <TableHeader
          titles={header}
          dropdown={dropdown}
          onSort={onSort}
          tabletView={tabletView}
          onOpenCFModal={onOpenCFModal}
          {...onCheckAll && { checkAll: checkAll, onCheckAll: onCheckAll }}
        />
      )}
      <tbody>
        {table &&
          table.map((item: Item) => {
            return (
              <tr key={item.id} className={modalSelection === item.id ? styles.activeRow : ''}>
                {Object.keys(item).map((k, i) => {
                  if (!hidden.includes(k)) {
                    return (
                      <TableItem
                        name={k}
                        key={i}
                        id={item.id}
                        uuid={item.uuid}
                        handleNavigate={k === 'name' && handleNavigate}
                        label={item[k]}
                        itemName={item.name}
                        item={item}
                        onCheck={onCheck}
                        checked={typeof item.id != 'undefined' && selection.includes(item.id)}
                        className={k === 'name' ? (smPadding ? ['smPadding', 'show'] : ['show']) : smPadding ? ['smPadding'] : []}
                        checkbox={checkbox === false ? checkbox : k === 'name' ? true : false}
                        mimetype={k === 'name' ? item.type : ''}
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
                      fileType={item.discriminator}
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
const mapStateToProps = (state: any) => ({ selection: state.selection.selection, modalSelection: state.selection.modalSelect })

export default connect(mapStateToProps)(Table)
