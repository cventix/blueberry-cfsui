import React, { Component } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { Stepbar } from '../../components/Stepbar/Stepbar'
import { Main } from '../../components/Main/Main'
import { LangSwitcher } from '../../components/ui-elements/LangSwitcher/LangSwitcher'
import './App.css'

import { Content } from '../../components/Content/Content'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'

// Services
import { myContainer } from '../../services/index'
import { TYPES } from '../../services/types'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component {
  private rest: any
  constructor(props: any) {
    super(props)
    this.rest = myContainer.get(TYPES.Rest)
  }

  componentDidMount() {
    const result = this.rest.get('myUrl', new Map<string, string>([['token', 'shaghz']]))
    console.log(result)
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />

        <Main>
          <LangSwitcher />
        </Main>
      </div>
    )
  }
}

export default App
