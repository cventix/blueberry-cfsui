import React, { Component } from 'react'
import { connect } from 'react-redux'

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
import { bottle } from '../../services'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login } from '../../services/internal/store/actions'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component<{ login: any }, {}> {
  async componentDidMount() {
    try {
      await this.props.login({ email: 'mirmahna.s@gmail.com', password: '@mir123Amir' })
    } catch (error) {
      console.log('E: ', error)
    }
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: PayloadInterface) => dispatch(login(payload)),
    setToken: (token: string) => dispatch(setToken(token)),
    setUserInfo: (payload: PayloadInterface) => dispatch(setUserCredentials(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
