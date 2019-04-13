import React, { Component } from "react";
import { TableItem } from "./TableItem";

export default interface Iprops {
  titles: any;
  dropdown?: boolean;
  onSort?: any;
  oncheckAll: any;
  checkAll: boolean;
}

export const TableHeader: React.SFC<Iprops> = ({
  titles,
  dropdown,
  onSort,
  oncheckAll
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
                  oncheckAll={oncheckAll}
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
