import React, { Component } from "react";

import styles from "./Table.module.scss";

export default interface Iprops {
  checkbox?: boolean;
  label: string;
  name?: string;
  sort?: boolean;
  className?: string;
  hasType?: any;
}

export const TableItem = ({
  label,
  checkbox,
  name,
  sort,
  className,
  hasType
}: Iprops) => {
  return (
    <td data-label={name} className={className ? styles[className] : " "}>
      <div className={styles.flex_row}>
        {checkbox && (
          <div className={[styles.flex_row, styles.checkbox].join(" ")}>
            <input type="checkbox" />
          </div>
        )}
        {hasType && <img src={hasType} />}
        <div>{label}</div>
        {sort && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
    </td>
  );
};
