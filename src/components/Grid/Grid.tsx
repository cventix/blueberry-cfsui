import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from './Card/Card'
import GridHeader from './GridHeader'
import { navigateObject } from '../Content/Content'

//styles
import styles from './Grid.module.scss'

//interface
import { ITableItem } from '../Content/ContentBody'

//todo check selection (Checked)
export interface Iprops {
  checkbox?: boolean
  table: ITableItem[]
  sortable?: boolean
  selection: Array<number>
  dropDownData?: any
  mainItem?: any
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string | undefined) => void
  onCheck?: (id: number, e?: any) => void
  handleNavigate?: (e: navigateObject) => void
}

const Grid: React.FunctionComponent<Iprops> = ({
  selection,
  mainItem,
  table,
  onCheckAll,
  onSort,
  onCheck,
  handleNavigate,
  checkbox,
  dropDownData
}) => {
  return (
    <React.Fragment>
      <GridHeader onCheckAll={onCheckAll} sortable={true} onSort={onSort} />
      <div className={styles.container}>
        {table.map((item: any, index: number) => {
          return (
            <Card
              handleNavigate={handleNavigate}
              key={index}
              dropDownData={dropDownData}
              item={item}
              mainItem={mainItem}
              checkbox={checkbox}
              onCheck={onCheck}
              checked={typeof item.id != 'undefined' && selection.includes(item.id)}
              dropdown={true}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state: any) => ({ selection: state.selection.selection, mainItem: state.sidebar.item })

export default connect(mapStateToProps)(Grid)
