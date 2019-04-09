import React, { Component } from "react";

import { TableHeader } from "./TableHeader";
import { TableItem } from "./TableItem";
import Dropdown from "../ui-elements/Dropdown/Dropdown";
import img from "../../images/typeIcons/icon-folder.svg";

import styles from "./Table.module.scss";

export default interface Iprops {
  table: any;
  dropdown?: boolean;
}

export const Table = ({ table, dropdown }: Iprops) => {
  return (
    <table className={styles.table}>
      <TableHeader titles={table[0]} dropdown={dropdown} />
      <tbody>
        {table.map((item: any, i: any) => {
          return (
            <tr>
              {Object.keys(item).map((k, i) => {
                if (k !== "type") {
                  return (
                    <TableItem
                      name={k}
                      label={item[k]}
                      checkbox={k === "نام" ? true : false}
                      hasType={k === "نام" && img}
                    />
                  );
                }
              })}
              {dropdown && <Dropdown isOpen={true} />}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
