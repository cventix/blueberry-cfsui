import React, { Component } from "react";
import logo from "./logo.svg";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./App.css";
import Table from "../../components/Table/Table";
const table = [
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 1,
    number: 10,
    name: "sth",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  },
  {
    id: 2,
    number: 323,
    name: "fdf",
    "some-other": "cxcxc",
    "sth-number": 132048912849284
  }
];

class App extends Component {
  render() {
    return (
      <div>
        <Navbar text="arezoo" />
        {/* <Sidebar text="arezoo" /> */}
        <div className={"content"}>
          <Table table={table} />
        </div>
      </div>
    );
  }
}

export default App;
