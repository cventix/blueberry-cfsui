import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Grid from '../Grid/Grid'
import Table from '../Table/Table'
import { t } from 'ttag'
import { Icon } from '../ui-elements/Icon'
// services
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { formatType } from '../../services/internal/utils/formatTypes'

//icons
import loadingIcon from '../../images/loading/tail-spin.2.svg'

//interface
import { ItemInterface } from '../../services/internal/store/reducers/documentReducer'
import { navigateObject } from './Content'
import useWindowDimensions from '../WindowDimensions/WindowDimensions'
import { setTempDocuments } from '../../services/internal/store/actions'

export interface Iprops {
  view: string
  width?: number
  dropdown?: boolean
  dropDownData?: any
  table: ITableItem[]
  checkbox?: boolean
  isMoveModal?: boolean
  hasHeader?: boolean
  username?: string
  loading?: boolean
  loadingStyle?: string
  handleNavigate?: ({ e, name, id, uuid, item }: navigateObject) => void
  onCheck?: (id: number, e?: any) => void
  onCheckAll?: () => void
  onOpenCFModal?: () => void
  onSort?: (sortBy: string, type?: string | undefined) => void
  setTempDocuments?: (e: any) => void
  turnOffbutton?: () => void
}

export interface ITableItem {
  id?: number
  type?: string
  name?: string
  discriminator?: string
  fullPath?: string
  created_at?: string
  owner?: any
  size?: string
  uuid?: string
  item?: any

}

const makeArray = (array: any, username?: string) => {
  let table: ITableItem[] = []
  let lang = localStorage.getItem('__language')
  array.map((each: ItemInterface) => {
    table.push({
      id: each.id,
      type: each.genericType && formatType(each.genericType, each.discriminator == 'D'),
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
  let table: ITableItem[] = []

  array.map((each: ItemInterface) => {
    if (each.discriminator === 'D') {
      table.push({
        id: each.id,
        type: each.genericType && formatType(each.genericType, each.discriminator == 'D'),
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
  dropDownData,
  handleNavigate,
  username,
  table,
  isMoveModal,
  onSort,
  onOpenCFModal,
  loading,
  loadingStyle,
  setTempDocuments,
  ...rest
}) => {
  console.log(username)
  table = isMoveModal ? makeSimpleArray(table) : makeArray(table, username)
  
  table.length < 10 && turnOffbutton && turnOffbutton()
  const { width } = useWindowDimensions()
  if (loading && table.length < 1) return <div className={loadingStyle}>{loading ? <Icon src={loadingIcon} /> : 'داده ای وجود ندارد'}</div>
  return view === 'table' ? (
    <Grid sortable={true} dropDownData={dropDownData} onSort={onSort} checkbox={true} table={table} handleNavigate={handleNavigate} {...rest} />
  ) : width < 768 ? (
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

const mapStateToProps = (state: any) => ({
  username: state.auth.username
})
const mapDispatchToProps = (dispatch: any) => {
  return {
    setTempDocuments: (value: any) => dispatch(setTempDocuments(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentBody)
