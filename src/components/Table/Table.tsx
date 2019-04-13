import React, { Component } from "react";

import { TableHeader } from "./TableHeader";
import { TableItem } from "./TableItem";
import Dropdown from "../ui-elements/Dropdown/Dropdown";
import { EnhanceDropdown as enhancer } from "../ui-elements/Dropdown/EnhanceDropdown";

import styles from "./Table.module.scss";

const EnhancedDropdown = enhancer(Dropdown);

export default interface Iprops {
  table: object[];
  dropdown?: boolean;
}

export class Table extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      table: props.table,
      checkAll: false
    };
  }

  onSort = (sortBy: string, type: string) => {
    let table = this.state.table;
    switch (type) {
      case "alphabet":
        table &&
          table.sort((a: any, b: any) => {
            if (a[sortBy] < b[sortBy]) {
              return -1;
            }
            if (a[sortBy] > b[sortBy]) {
              return 1;
            }
            return 0;
          });
        break;
      default:
        table &&
          table.sort((a: any, b: any) => {
            if (this.state[sortBy] !== "ascending") {
              this.setState({ [sortBy]: "ascending" });
              return a[sortBy] - b[sortBy];
            } else {
              this.setState({ [sortBy]: "decending" });
              return b[sortBy] - a[sortBy];
            }
          });
    }

    this.setState({ table });
  };

  oncheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll });
  };
 
  public render() {
    let { table, dropdown } = this.props;
    return (
      <table className={styles.table}>
        <TableHeader
          titles={table[0]}
          dropdown={dropdown}
          onSort={this.onSort}
          checkAll={this.state.checkAll}
          oncheckAll={this.oncheckAll}
        />
        <tbody>
          {this.state.table.map((item: any, i: any) => {
            return (
              <tr key={i}>
                {Object.keys(item).map((k, i) => {
                  if (k !== "type") {
                    return (
                      <TableItem
                        name={k}
                        key={i}
                        label={item[k]}
                        checkAll={this.state.checkAll}
                        className={k === "نام" ? ["show"] : [" "]}
                        checkbox={k === "نام" ? true : false}
                        hasType={k === "نام" && item["type"]}
                      />
                    );
                  }
                })}
                {dropdown && (
                  <td className={[styles.show, styles.left].join(" ")}>
                    <EnhancedDropdown data={["one", "two", "three"]} />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
