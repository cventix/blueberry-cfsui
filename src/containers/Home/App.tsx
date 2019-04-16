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
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']

class App extends Component {
  state = { show: false }

  showModal = () => {
    this.setState({ show: true })
  }

  hideModal = () => {
    this.setState({ show: false })
  }
  render() {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <Main>
          <Content />
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <img src={icon} />
            jkjk
          </Modal>
          <button type="button" onClick={this.showModal}>
            open
          </button>
        </Main>
      </div>
    )
  }
}

export default App
