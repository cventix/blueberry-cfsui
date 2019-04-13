import React, { Component } from "react";

import { TableHeader } from "./TableHeader";
import { TableItem } from "./TableItem";
import Dropdown from "../ui-elements/Dropdown/Dropdown";
import img from "../../images/typeIcons/icon-folder.svg";
import { EnhanceDropdown as enhancer } from "../ui-elements/Dropdown/EnhanceDropdown";

import styles from "./Table.module.scss";

const EnhancedDropdown = enhancer(Dropdown);

export default interface Iprops {
  table: any;
  dropdown?: boolean;
}

export class Table extends React.Component<any, any> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      table: props.table,
      checkAll: false,
      isOpen: false,
      data: ["one", "two", "three"]
    };
  }

  onSort = (sortBy: string, type: string) => {
    let table = this.state.table;
    switch (type) {
      case "alphabet":
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
  onOpenDropdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
                    <EnhancedDropdown
                      optionSelected={this.state.optionSelected}
                      onSelect={option =>
                        this.setState({ optionSelected: option })
                      }
                      data={this.state.data}
                    />
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
