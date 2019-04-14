import React, { Component } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Stepbar } from "../../components/Stepbar/Stepbar";
import { Main } from "../../components/Main/Main";
import { TextInput } from "../../components/ui-elements/Input/Input";
import "./App.css";

import { Content } from "../../components/Content/Content";
import { Table } from "../../components/Table/Table";

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
        
          <TextInput placeholder="name" message="lkrek" label="nswqkje"/>
        </Main>
      </div>
    );
  }
}

export default App;
