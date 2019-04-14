import React from "react";
import { Table } from "../Table/Table";
import { Grid } from "../Grid/Grid";
import { GridHeader } from "../Grid/GridHeader";
import { Contentheader } from "./Contentheader";

const table = [
  {
    نام: "رزومه ها",
    مالک: 10,
    تاریخ: "sth",
    حجم: 444,
    "-": "-",
    type: "folder"
  },
  {
    نام: "عکس های شخصی",
    مالک: 323,
    تاریخ: "fdf",
    حجم: 444231,
    "-": "-",
    type: "folder"
  },
  {
    نام: "موسیقی",
    مالک: 10,
    تاریخ: "sth",
    حجم: 42323,
    "-": "-",
    type: "music"
  },
  {
    نام: "رزومه",
    مالک: 10,
    تاریخ: "sth",
    حجم: 4234324,
    "-": "-",
    type: "folder"
  },
  {
    نام: "رزومه",
    مالک: 323,
    تاریخ: "fdf",
    حجم: 21321,
    "-": "-",
    type: "folder"
  },
  {
    نام: "رزومه",
    مالک: 10,
    تاریخ: "sth",
    حجم: 5325,
    "-": "-",
    type: "video"
  }
];

export class Content extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      table: table,
      checkAll: false,
      view: "table"
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

  onCheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll });
  };

  switchView = (view: string) => {
    this.setState({ view });
  };

  public render() {
    return (
      <div>
        <Contentheader view={this.state.view} switchView={this.switchView}/>
        {this.state.view === "grid" ? (
          <Table
            dropdown={true}
            onCheckAll={this.onCheckAll}
            checkAll={this.state.checkAll}
            onSort={this.onSort}
            table={this.state.table}
          />
        ) : (
          <div>
            <GridHeader
              onCheckAll={this.onCheckAll}
              checkAll={this.state.checkAll}
              sortable={true}
            />
            <Grid
              checkbox={true}
              onCheckAll={this.onCheckAll}
              checkAll={this.state.checkAll}
              table={this.state.table}
            />
          </div>
        )}
      </div>
    );
  }
}
