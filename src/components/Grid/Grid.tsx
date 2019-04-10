import React, { Component } from "react";
import styles from "./Grid.module.scss";
import { Card } from "../ui-elements/Card/Card";

export default interface Iprops {
  checkbox?: boolean;
  table: any;
}

export const Grid = ({ table, checkbox }: Iprops) => {
  return (
      <div className={styles.container}>
          {table.map((item:any)=> { return <Card item={item} checkbox={true} dropdown={true}/> })}
      </div>
  );
};
