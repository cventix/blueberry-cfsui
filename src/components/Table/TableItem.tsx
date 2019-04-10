import React, { Component } from "react";

import styles from "./Table.module.scss";

export default interface Iprops {
  checkbox?: boolean;
  label: string;
  name?: string;
  sortable?: boolean;
  onSort?: any;
  sortType?: string;
  className?: any;
  hasType?: any;
}

const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(" ");
};

export const TableItem = ({
  label,
  checkbox,
  name,
  sortable,
  onSort,
  sortType,
  className,
  hasType
}: Iprops) => {
  return (
    <td data-label={name} className={className ? splitter(className) : " "}>
      <div className={styles.flex_row}>
        {checkbox && (
          <div className={[styles.flex_row, styles.checkbox].join(" ")}>
            <input type="checkbox" />
          </div>
        )}
        {hasType && <img src={hasType} />}
        <div>{label}</div>
        {sortable && (
          <div className={styles.sort} onClick={() => onSort(label, sortType)}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
    </td>
  );
};
