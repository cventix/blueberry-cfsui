import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { Stepbar } from '../../components/Stepbar/Stepbar'
import { Main } from '../../components/Main/Main'
import { LangSwitcher } from '../../components/ui-elements/LangSwitcher/LangSwitcher'
import './App.css'

import Content from '../../components/Content/Content'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'

// Services
import { bottle } from '../../services'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login } from '../../services/internal/store/actions'
import { DocumentsInterface } from '../../services/internal/repositories/documents'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component<{ login: any; setUserInfo: any }, {}> {
  private _documents: DocumentsInterface
  constructor(props: any) {
    super(props)
    this._documents = bottle.container.Documents
  }
  state = {
    showcFmodal: false,
    showModal: false
  }
  async componentDidMount() {
    console.log('#', this.props)

    try {
      await this.props.login({ email: 'mirmahna.s@gmail.com', password: '13731377' })
      let blah = this.props.setUserInfo({ username: 'w' })
      console.log(blah)
      // const result = await this._documents.getDocuments()
      // console.log('#', result)
      // const result2 = await this._documents.createFolder({ name: 'new_folder', description: 'just for test' })
      // console.log('@', result2)
      // const result3 = await this._documents.renameFolder({ folderId: 19851, name: 'new_shaghz' })
      // console.log('*', result3)
      // const result4 = await this._documents.moveDocuments({ documentIds: [19803, 19807], targetId: 19853 })
      // console.log('$', result4)
      // const result5 = await this._documents.shareDocuments({
      //   documentIds: [19804],
      //   userEmails: ['mirmahna.asdasdasd@gmail.com']
      // })
      // console.log('%', result5)
    } catch (error) {
      console.log('E: ', error)
    }
  }
  createFolderModal = () => {
    console.log('hi')
    this.setState({ showcFmodal: true, showModal: true })
  }

  handleCFClose = () => {
    this.setState({ showcFmodal: false, showModal: false })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar createFolderModal={this.createFolderModal} showModal={this.state.showcFmodal} handleCFClose={this.handleCFClose} />
        <Main showModal={this.state.showModal}>
          <Content />
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
