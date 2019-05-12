import React, { Component } from 'react'
import { Grid } from '../Grid/Grid'
import { Table } from '../Table/Table'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { sliceData } from '../../services/internal/utils/sliceData'

export default interface Iprops {
  view: string
  width?: number
  dropdown?: boolean
  dropDownData?: any
  handleNavigate?: any
  table: any
  optionSelected?: number
  onSelect?: any
  onCheckAll?: any
  onCheck?: any
  checkAll?: any
  checkbox?: boolean
  isMoveModal?: boolean
  hasHeader?:boolean
}
const makeArray = (array: any) => {
  let table: any[] = []
  array.map((each: any) => {
    table.push({
      id: each.id,
      type: each.genericType,
      name: each.name,
      discriminator: each.discriminator,
      fullPath: each.fullPath,
      created_at: formatDate(each.createdAt),
      owner: each.owner.displayName,
      size: each.size ? formatBytes({ bytes: each.size, lang: 'fa' }) : '---'
    })
  })
  return table
}
const makeSimpleArray = (array: any) => {
  let table: any[] = []

  array.map((each: any) => {
    if (each.discriminator === 'D') {
      table.push({
        id: each.id,
        type: each.genericType,
        name: each.name,
        discriminator: each.discriminator,
        fullPath: each.fullPath,
      })
    }
  })
  return table
}

export const ContentBody: React.FunctionComponent<Iprops> = ({ view, width, dropDownData, handleNavigate, table, isMoveModal, ...rest }) => {
  table = isMoveModal ? makeSimpleArray(table) : makeArray(table)
  console.log(table)
  return view === 'table' && width && width < 768 ? (
    <Grid sortable={true} dropDownData={dropDownData} checkbox={true} table={table} handleNavigate={handleNavigate} {...rest} />
  ) : view === 'table' ? (
    <Grid sortable={true} dropDownData={dropDownData} checkbox={true} table={table} handleNavigate={handleNavigate} {...rest} />
  ) : (
    <Table
      dropdown={true}
      tabletView={width && width < 768 ? true : false}
      dropDownData={dropDownData}
      handleNavigate={handleNavigate}
      table={table}
      {...rest}
    />
  )
}
