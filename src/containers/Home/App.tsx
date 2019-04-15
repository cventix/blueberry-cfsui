import React, { Component } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Stepbar } from "../../components/Stepbar/Stepbar";
import { Main } from "../../components/Main/Main";
import { TextInput } from "../../components/ui-elements/Input/Input";
import { SearchInput } from "../../components/ui-elements/SearchInput/SearchInput";
import { ValueCopyInput } from "../../components/ui-elements/ValueCopyInput/ValueCopyInput";
import { SelectInput } from "../../components/ui-elements/SelectInput/SelectInput";
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
const options = [
  { value: '2', label: 'آیتم ۱' },
  { value: '3', label: 'آیتم ۲' },
  { value: '4', label: 'آیتم ۳' }
]
class App extends Component {
  render() {

    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
          <TextInput placeholder="نام کاربری" label="نلم کاربری" success={true}/>
          <SearchInput />
          <ValueCopyInput />
          <SelectInput options={options} placeholder="آیتمی را لنتخاب"/>
        </Main>
      </div>
    );
  }
}

export default App;
