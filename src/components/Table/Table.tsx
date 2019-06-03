import React, { Component } from 'react'
import { t } from 'ttag'

import { TableHeader } from './TableHeader'
import { TableItem } from './TableItem'
import Dropdown from '../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../ui-elements/Dropdown/EnhanceDropdown'

import styles from './Table.module.scss'
import { connect } from 'react-redux'
import { select } from 'glamor'

const EnhancedDropdown = enhancer(Dropdown)

export interface Iprops {
  table?: object[]
  selection?: any
  dropdown?: boolean
  onCheckAll?: () => void
  checkAll?: boolean
  onSort?: any
  tabletView?: boolean
  onOpenCFModal?: any
  onSelect?: (option: number) => void
  onRenameDocument?: (e: any) => void
  handleNavigate?: any
  optionSelected?: number
  position?: any
  dropDownData?: any
  checkbox?: boolean
  onCheck?: any
  itemName?: string
  activeRow?: boolean
  data?: any
  hasHeader?: boolean
  modalSelection?: any
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
  itemName,
  dropDownData,
  handleNavigate,
  optionSelected,
  checkbox,
  onCheck,
  modalSelection,
  activeRow,
  onOpenCFModal,
  hasHeader = true
}) => {
  const header = [t`نام`, t`تاریخ`, t`مالک`, t`حجم`]
  console.log(modalSelection)
  return (
    <table className={styles.table}>
      {hasHeader && (
        <TableHeader
          titles={header}
          dropdown={dropdown}
          {...onCheckAll && { checkAll: checkAll, onCheckAll: onCheckAll }}
          onSort={onSort}
          tabletView={tabletView}
          onOpenCFModal={onOpenCFModal}
        />
      )}
      <tbody>
        {table &&
          table.map((item: any, index: number) => {
            return (
              <tr key={item.id} className={modalSelection === item.id ? styles.activeRow : ''}>
                {Object.keys(item).map((k, i) => {
                  if (k !== 'type' && k !== 'id' && k !== 'fullPath' && k !== 'discriminator' && k !== 'uuid' && k !== 'item') {
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
                        checked={selection.includes(item.id)}
                        className={k === 'name' ? ['show'] : [' ']}
                        checkbox={checkbox === false ? checkbox : k === 'name' ? true : false}
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
