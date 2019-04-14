<<<<<<< HEAD
import React, { Component } from 'react'
import styles from './Grid.module.scss'
import { Card } from './Card/Card'
=======
import React, { Component } from "react";
import styles from "./Grid.module.scss";
import { Card } from "./Card/Card";
import { GridHeader } from "./GridHeader";
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf

export default interface Iprops {
  checkbox?: boolean
  table: object[]
  isOpen?: boolean
  onCheckAll?: () => void
  checkAll?: boolean
}

<<<<<<< HEAD
export const Grid: React.FunctionComponent<Iprops> = ({ table, checkbox }) => {
  return (
    <div className={styles.container}>
      {table.map((item: any, index: number) => {
        return <Card key={index} item={item} checkbox={checkbox} dropdown={true} />
=======
export const Grid: React.SFC<Iprops> = ({ table, checkbox, checkAll }) => {
  return (
    <div className={styles.container}>
      {table.map((item: any, index: number) => {
        return (
          <Card
            key={index}
            item={item}
            checkbox={checkbox}
            dropdown={true}
            checkAll={checkAll}
          />
        );
>>>>>>> 8927f9658fb209b4e10bd360cc0bdbbdf41f45bf
      })}
    </div>
  )
}
