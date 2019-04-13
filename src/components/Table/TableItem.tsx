import React, { Component } from "react";

import styles from "./Table.module.scss";
import { Icon } from "../ui-elements/Icon";

export default interface Iprops {
  checkbox?: boolean;
  label: string;
  name?: string;
  sortable?: boolean;
  onSort?: any;
  sortType?: string;
  className?: any;
  hasType?: any;
  oncheckAll?: any;
  checkAll?: boolean;
}

const splitter = (className: any) => {
  return className.map((cls: any) => styles[cls]).join(" ");
};

export const TableItem: React.SFC<Iprops> = ({
  label,
  checkbox,
  name,
  sortable,
  onSort,
  sortType,
  className,
  hasType,
  oncheckAll,
  checkAll
}) => {
  return (
    <td
      data-label={name}
      className={className ? splitter(className) : " "}
      {...(sortable && { onClick: () => onSort(label, sortType) })}
    >
      <div className={styles.flex_row}>
        {checkbox && (
          <div className={[styles.flex_row, styles.checkbox].join(" ")}>
            <input
              type="checkbox"
              onChange={oncheckAll}
              checked={checkAll ? true : false}
            />
          </div>
        )}
        {hasType && <Icon mimetype={hasType} />}
        <div>{label}</div>
        {sortable && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
    </td>
  );
};
