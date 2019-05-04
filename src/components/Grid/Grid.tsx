import React, { Component } from 'react'
import { Card } from './Card/Card'

import styles from './Grid.module.scss'
import { GridHeader } from './GridHeader'

export default interface Iprops {
  checkbox?: boolean
  table: object[]
  isOpen?: boolean
  onCheckAll?: () => void
  onSort?: any
  checkAll?: boolean
  dropDownData?: any
  sortable?: boolean
  handleNavigate?: any
}

export const Grid: React.FunctionComponent<Iprops> = ({ table, onCheckAll, onSort, handleNavigate, checkbox, checkAll, dropDownData }) => {
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
              dropdown={true}
              checkAll={checkAll}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}
