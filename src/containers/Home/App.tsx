import React, { Component } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Stepbar } from '../../components/Stepbar/Stepbar'
import { Main } from '../../components/Main/Main'
import { SelectInput } from '../../components/ui-elements/SelectInput/SelectInput'
import './App.css'

import { Content } from '../../components/Content/Content'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import { saveLocale } from '../../translate/translate';
import { t, jt } from 'ttag';

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const setLocale = (locale: string) => () => {
  saveLocale(locale);
  window.location.reload();
  console.log(locale)
}

const LangSwitcher = () => (
  <div className="Lang-switch">
    <a href='/' onClick={setLocale('en')}>en</a>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        
        <Main>
        { t`امورش ttag` }
          <Content />
          <LangSwitcher/>
          <SelectInput options={options} placeholder={t`ندارم`}/>
        </Main>
      </div>
    )
  }
}

export default App
