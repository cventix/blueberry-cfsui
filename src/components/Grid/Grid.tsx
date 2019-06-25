import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import { navigateObject } from '../Content/Content'
import GridHeader from './GridHeader'
import { Card } from './Card/Card'

//interface
import { ITableItem } from '../Content/ContentBody'

//styles
import styles from './Grid.module.scss'

// todo check selection (Checked)
export interface Iprops {
  checkbox?: boolean
  table: ITableItem[]
  sortable?: boolean
  selection: Array<number>
  dropDownData?: any
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string | undefined) => void
  onCheck?: (id: number, e?: any) => void
  handleNavigate?: (e: navigateObject) => void
}

const Grid: React.FunctionComponent<Iprops> = ({ selection, table, onCheckAll, onSort, onCheck, handleNavigate, checkbox, dropDownData }) => {
  return (
    <React.Fragment>
      <GridHeader onCheckAll={onCheckAll} sortable={true} onSort={onSort} />
      <div className="pg-flex pg-flex-wrap pg-relative mobile-max:pg-justify-center" >
        {table.map((item: any, index: number) => {
          return (
            <Card
              handleNavigate={handleNavigate}
              key={index}
              dropDownData={dropDownData}
              item={item}
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
const mapStateToProps = (state: any) => ({ selection: state.selection.selection })

export default connect(mapStateToProps)(Grid)
