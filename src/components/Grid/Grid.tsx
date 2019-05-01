import React, { Component } from 'react'
import { Card } from './Card/Card'

import styles from './Grid.module.scss'

export default interface Iprops {
  checkbox?: boolean
  table: object[]
  isOpen?: boolean
  onCheckAll?: () => void
  checkAll?: boolean
  dropDownData?: any
  handleNavigate?:any
}

export const Grid: React.FunctionComponent<Iprops> = ({ table,handleNavigate, checkbox, checkAll, dropDownData }) => {
  return (
    <div className={styles.container}>
      {table.map((item: any, index: number) => {
        return <Card handleNavigate={handleNavigate} key={index} dropDownData={dropDownData} item={item} checkbox={checkbox} dropdown={true} checkAll={checkAll} />
      })}
    </div>
  )
}
