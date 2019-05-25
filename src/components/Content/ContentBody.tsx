import React, { Component } from 'react'

// components
import { Grid } from '../Grid/Grid'
import { Table } from '../Table/Table'

// services
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { formatType } from '../../services/internal/utils/formatTypes'
import { sliceData } from '../../services/internal/utils/sliceData'
import { t } from 'ttag'

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
  onOpenCFModal?: any
  onSort?: any
  onCheck?: any
  checkAll?: any
  turnOffbutton?: any
  checkbox?: boolean
  isMoveModal?: boolean
  hasHeader?: boolean
  username?: string
}

const makeArray = (array: any, username?: string) => {
  let table: any[] = []
  let lang = localStorage.getItem('__language')
  array.map((each: any) => {
    table.push({
      id: each.id,
      type: formatType(each.genericType, each.discriminator == 'D'),
      name: each.name,
      discriminator: each.discriminator,
      fullPath: each.fullPath,
      created_at: formatDate(each.createdAt),
      owner: username && each.owner.displayName === username ? t`خودم` : each.owner.displayName,
      size: each.size ? formatBytes({ bytes: each.size, lang }) : '---',
      uuid: each.uuid,
      item: each
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
        type: formatType(each.genericType, each.discriminator == 'D'),
        name: each.name,
        discriminator: each.discriminator,
        fullPath: each.fullPath
      })
    }
  })
  return table
}

export const ContentBody: React.FunctionComponent<Iprops> = ({
  view,
  turnOffbutton,
  width,
  dropDownData,
  handleNavigate,
  username,
  table,
  isMoveModal,
  onSort,
  onOpenCFModal,
  ...rest
}) => {
  table = isMoveModal ? makeSimpleArray(table) : makeArray(table, username)
  table.length < 10 && turnOffbutton && turnOffbutton()
  console.log(table)
  return view === 'table' && width && width < 768 ? (
    <Grid sortable={true} dropDownData={dropDownData} onSort={onSort} checkbox={true} table={table} handleNavigate={handleNavigate} {...rest} />
  ) : view === 'table' ? (
    <Grid sortable={true} dropDownData={dropDownData} onSort={onSort} checkbox={true} table={table} handleNavigate={handleNavigate} {...rest} />
  ) : (
    <Table
      dropdown={true}
      tabletView={width && width < 768 ? true : false}
      onOpenCFModal={onOpenCFModal}
      dropDownData={dropDownData}
      onSort={onSort}
      handleNavigate={handleNavigate}
      table={table}
      {...rest}
    />
  )
}
