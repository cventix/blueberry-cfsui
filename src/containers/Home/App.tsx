import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Stepbar } from "../../components/Stepbar/Stepbar";
import { Main } from "../../components/Main/Main";
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

const steps = [
  'انتخاب سیستم عامل',
  'انتخاب مدت سرویس',
  'انتخاب طرح', 
  'اطلاعات کارت شبکه',
  'انتخاب نام سرور و ثبت نهایی'
]

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
          <Stepbar steps={steps} currentStep={2}/>
        </Main>
      </div>
    );
  }
}

export default App;
