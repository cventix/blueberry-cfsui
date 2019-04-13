import React, { Component } from "react";
import styles from "./Grid.module.scss";
import { Card } from "./Card/Card";

export default interface Iprops {
  checkbox?: boolean;
  table: object[];
  isOpen?: boolean;
  onCheckAll?: () => void;
  checkAll?: boolean;
}

export const Grid: React.FunctionComponent<Iprops> = ({ table, checkbox }) => {
  return (
    <div className={styles.container}>
      {table.map((item: any, index: number) => {
        return (
          <Card key={index} item={item} checkbox={checkbox} dropdown={true} />
        );
      })}
    </div>
  );
};
