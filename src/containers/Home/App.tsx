import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Main } from "../../components/Main/Main";
import "./App.css";
import { Table } from "../../components/Table/Table";
import { Grid } from "../../components/Grid/Grid";

const table = [
  {
    نام: 'رزومه ها',
    مالک: 10,
    تاریخ: "sth",
    حجم:444,
    "-": "-",
    type: "folder"
  },
  {
    نام: 'عکس های شخصی',
    مالک: 323,
    تاریخ: "fdf",
    حجم:444231,
    "-": "-",
    type: "folder"
  },
  {
    نام: 'موسیقی',
    مالک: 10,
    تاریخ: "sth",
    حجم:42323,
    "-": "-",
    type: "music"
  },
  {
    نام: 'رزومه',
    مالک: 10,
    تاریخ: "sth",
    حجم: 4234324,
    "-": "-",
    type: "folder"
  },
  {
    نام: 'رزومه',
    مالک: 323,
    تاریخ: "fdf",
    حجم:21321,
    "-": "-",
    type: "folder"
  },
  {
    نام: 'رزومه',
    مالک: 10,
    تاریخ: "sth",
    حجم:5325,
    "-": "-",
    type: "video"
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main><Grid table={table}/></Main>
      </div>
    );
  }
}

export default App;
