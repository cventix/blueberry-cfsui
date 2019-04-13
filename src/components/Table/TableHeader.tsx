import React, { Component } from "react";
import { TableItem } from "./TableItem";

export default interface Iprops {
  titles: any;
  dropdown?: boolean;
  onSort?: any;
  onCheckAll?: any;
  checkAll?: boolean;
}

export const TableHeader: React.SFC<Iprops> = ({
  titles,
  dropdown,
  onSort,
  onCheckAll
}) => {
  return (
    <thead>
      {titles && (
        <tr>
          {Object.keys(titles).map((label, i) => {
            if (label !== "type") {
              return (
                <TableItem
                  key={i}
                  label={label}
                  checkbox={label === "نام" ? true : false}
                  onCheckAll={onCheckAll}
                  sortable={true}
                  sortType={label === "تاریخ" ? "alphabet" : " "}
                  onSort={onSort}
                  className={label === "نام" ? ["header", "show"] : ["header"]}
                />
              );
            }
          })}
          {dropdown && <td />}
        </tr>
      )}
    </thead>
  );
};
