import React, { Component } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Stepbar } from '../../components/Stepbar/Stepbar'
import { Main } from '../../components/Main/Main'
import { TextInput } from '../../components/ui-elements/Input/Input'
import './App.css'

import { Content } from '../../components/Content/Content'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
>>>>>>> e9b5659842c6845cf9abe718b045b0491a7795d1
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
          <Content />
        </Main>
      </div>
    )
  }
}

export default App
