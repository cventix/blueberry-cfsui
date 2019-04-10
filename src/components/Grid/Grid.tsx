import React, { Component } from "react";
import styles from "./Grid.module.scss";
import { Card } from "../ui-elements/Card/Card";

export default interface Iprops {
  checkbox?: boolean;
  table: any;
  isOpen?: boolean;
}

export const Grid = ({ table, checkbox }: Iprops) => {
  return (
    <div className={styles.container}>
      {table.map((item: any, index: number) => {
        return (
          <Card
            item={item}
            checkbox={true}
            dropdown={index == 3 ? true : false}
          />
        );
      })}
    </div>
  );
};
