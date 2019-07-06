import React, { Component, useState, Children } from 'react'
import { connect } from 'react-redux'

import  TableItem  from './TableItem'

import styles from './Table.module.scss'

export interface Iprops {
  item: any
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
  children?: any
  openModal?: any
  onCheck?: (id: number, e?: any) => void
  handleChange?: any
}

const TableRow: React.FunctionComponent<Iprops> = ({
  item,
  children,
  selection,
  isMoveModal,
  handleNavigate,
  checkbox,
  handleChange,
  onCheck,
  openModal,
  modalSelection,
  smPadding = false
}) => {
  const hidden = ['type', 'id', 'fullPath', 'discriminator', 'uuid', 'item']
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
  return (
    <tr
      key={item.id}
      className={isMoveModal && modalSelection === item.id ? styles.activeRow :  ''}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      {Object.keys(item).map((k, i) => {
        if (!hidden.includes(k)) {
          return (
            <TableItem
              name={k}
              key={i}
              id={item.id}
              hovered={hovered && hovered}
              handleChange={  handleChange}
              uuid={item.uuid}
              handleNavigate={k === 'name' && handleNavigate}
              openModal={openModal}
              label={item[k]}
              itemName={item.name}
              item={item}
              onCheck={onCheck}
              shareButton={k == 'size'}
              checked={typeof item.id != 'undefined' && selection.includes(item.id)}
              className={k === 'name' ? (smPadding ? ['smPadding', 'show'] : ['show']) : smPadding ? ['smPadding'] : []}
              checkbox={checkbox === false ? checkbox : k === 'name' ? true : false}
              mimetype={k === 'name' ? item.type : ''}
            />
          )
        }
      })}

      {children}
    </tr>
  )
}
const mapStateToProps = (state: any) => ({ selection: state.selection.selection, modalSelection: state.selection.modalSelect })

export default connect(mapStateToProps)(TableRow)
