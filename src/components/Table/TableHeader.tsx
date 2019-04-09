import React, { Component } from "react";
import { TableItem } from "./TableItem";

export default interface Iprops {
  titles: any;
  dropdown?: boolean;
}

export const TableHeader = ({ titles, dropdown}: Iprops) => {
  return (
    <thead>
      {titles && (
        <tr>
          {Object.keys(titles).map((label, i) => {
            if (label !== "type") {
              return (
                <TableItem
                  label={label}
                  checkbox={label === "نام" ? true : false}
                  sort={true}
                  className={"header"}
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
