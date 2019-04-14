import React, { Component } from "react";
import styles from "./Grid.module.scss";
import { Card } from "./Card/Card";
import { GridHeader } from "./GridHeader";

export default interface Iprops {
  checkbox?: boolean;
  table: object[];
  isOpen?: boolean;
  onCheckAll?: () => void;
  checkAll?: boolean;
}

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
      })}
    </div>
  );
};
