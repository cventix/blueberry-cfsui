import React, { Component } from 'react'

//styles
import styles from './Card.module.scss'

export default interface Iprops {
  item?: any
}

export const Card: React.FunctionComponent<Iprops> = ({ item }) => {
  return (
    <div className={styles.item}>
     
    </div>
  )
}
