import React, { Component, useState, Children } from 'react'
import { connect } from 'react-redux'

import TableItem from './TableItem'

import styles from './Table.module.scss'
import Invoice from '../../containers/Account/Billing/Invoice'
import { getInvoice } from '../../services/internal/store/actions'

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
  tr?: any
  id?: any
  invoice?: any
  getInvoice?: any
  onCheck?: (id: number, e?: any) => void
  handleChange?: any
}

class TableRow extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      hovered: false,
      expanded: false,
      loading: false
    }
  }
  setEachState = (each: any) => {
    this.setState({ [each]: !this.state[each] })
  }

  renderInvoice = () => {
    this.setState({ expanded: !this.state.expanded, loading: !this.state.loading })
    this.props.getInvoice(this.props.id)
  }
  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    if (nextProps.invoice.length > 0) {
      this.setState({ loading: false, name: nextProps.invoice.name })
    }
  }

  render() {
    const {
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
      tr,
      id,
      getInvoice,
      invoice,
      smPadding = false
    } = this.props
    const hidden = ['type', 'id', 'fullPath', 'discriminator', 'uuid', 'item', 'genericType']
    const { hovered, expanded, loading, name } = this.state
    console.log(item)
    console.log(invoice)
   
    return (
      <>
        <tr
          key={item.id}
          className={isMoveModal && modalSelection === item.id ? styles.activeRow : invoice.id == item.id ?'pg-bg-white pg-border-2 pg-border-b-0 pg-border-blue-400' : ''}
          onMouseEnter={() => this.setEachState('hovered')}
          onMouseLeave={() => this.setEachState('hovered')}
        >
          {Object.keys(item).map((k, i) => {
            if (!hidden.includes(k)) {
              return (
                <TableItem
                  name={k}
                  key={i}
                  id={item.id}
                  hovered={hovered && hovered}
                  handleChange={handleChange}
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
          {tr && (
            <td className={[styles.show, styles.left].join(' ')} data-name={id} onClick={this.renderInvoice}>
              {`جزئیات`}
            </td>
          )}
        </tr>
        {tr && expanded ? <Invoice /> : ''}
      </>
    )
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getInvoice: (value: any) => dispatch(getInvoice(value))
  }
}
const mapStateToProps = (state: any) => ({
  selection: state.selection.selection,
  modalSelection: state.selection.modalSelect,
  invoice: state.account.invoice
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableRow)
