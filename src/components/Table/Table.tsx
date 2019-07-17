import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import { t } from 'ttag'

import TableHeader from './TableHeader'

import Dropdown from '../ui-elements/Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../ui-elements/Dropdown/EnhanceDropdown'

import styles from './Table.module.scss'

//interface
import { ITableItem } from '../Content/ContentBody'
import TableRow from './TableRow';

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
  isMoveModal?: boolean
  data?: any
  hasHeader?: boolean
  modalSelection?: number
  smPadding?: boolean
  openModal ?: any 
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string | undefined) => void
  onOpenCFModal?: () => void
  onSelect?: (option: number) => void
  onRenameDocument?: (e: any) => void
  onCheck?: (id: number, e?: any) => void
  handleChange?: any
}

const Table: React.FunctionComponent<Iprops> = ({
  table,
  dropdown,
  onCheckAll,
  selection,
  checkAll,
  isMoveModal,
  onSort,
  tabletView,
  onSelect,
  dropDownData,
  handleNavigate,
  optionSelected,
  checkbox,
  openModal,
  onCheck,
  modalSelection,
  smPadding = false,
  onOpenCFModal,
  handleChange,
  hasHeader = true
}) => {
  const header = [t`نام`, t`تاریخ`, t`مالک`, t`حجم`]
  const hidden = ['type', 'id', 'fullPath', 'discriminator', 'uuid', 'item','genricType']
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
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
          table.map((item: Item,index:number) => {
            return (
              <TableRow item={item} key={index} isMoveModal={isMoveModal}   handleChange={handleChange} checkbox={checkbox} handleNavigate={handleNavigate} onCheck={onCheck} smPadding={smPadding} openModal={openModal}>
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
              </TableRow>
            )
          })}
      </tbody>
    </table>
  )
}
const mapStateToProps = (state: any) => ({ selection: state.selection.selection, modalSelection: state.selection.modalSelect })

export default connect(mapStateToProps)(Table)
