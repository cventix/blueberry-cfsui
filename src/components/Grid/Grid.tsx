import React, { Component } from 'react'
import { Card } from './Card/Card'

import styles from './Grid.module.scss'
import { GridHeader } from './GridHeader'
import { navigateObject } from '../Content/Content'
import { connect } from 'react-redux'

export interface Iprops {
  checkbox?: boolean
  table: object[]
  isOpen?: boolean
  onCheckAll?: () => void
  onSort?: any
  checkAll?: boolean
  dropDownData?: any
  onCheck?: any
  sortable?: boolean
  handleNavigate?: (e: navigateObject) => void
  selection?: any
}

const Grid: React.FunctionComponent<Iprops> = ({
  selection,
  table,
  onCheckAll,
  onSort,
  onCheck,
  handleNavigate,
  checkbox,
  checkAll,
  dropDownData
}) => {
  return (
    <React.Fragment>
      <GridHeader onCheckAll={onCheckAll} checkAll={checkAll} sortable={true} onSort={onSort} />
      <div className={styles.container}>
        {table.map((item: any, index: number) => {
          return (
            <Card
              handleNavigate={handleNavigate}
              key={index}
              dropDownData={dropDownData}
              item={item}
              checkbox={checkbox}
              onCheck={onCheck}
              checked={selection[index]}
              dropdown={true}
              checkAll={checkAll}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}
const mapStateToProps = (state: any) => ({ selection: state.selection.selection })

export default connect(mapStateToProps)(Grid)
