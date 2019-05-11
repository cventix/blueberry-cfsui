import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { Main } from '../../components/Main/Main'
import { LangSwitcher } from '../../components/ui-elements/LangSwitcher/LangSwitcher'
import { Stepbar } from '../../components/Stepbar/Stepbar'
import './App.css'
import styles from '../../components/Content/Content.module.scss'

import Content from '../../components/Content/Content'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import CFModal from '../../components/ui-elements/Modal/CreateFolder'
// Services
import { bottle } from '../../services'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login, removeFolder } from '../../services/internal/store/actions'
import { DocumentsInterface } from '../../services/internal/repositories/documents'

import Toast from '../../components/ui-elements/Toast/Toast'
import { CountdownTimer } from '../../components/ui-elements/CountdownTimer/CountdownTimer'

const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component<{ login: any; setUserInfo: any; history?: any; selection?: any[]; removeFolder?: any }, {}> {
  private _documents: DocumentsInterface
  constructor(props: any) {
    super(props)
    this._documents = bottle.container.Documents
  }
  state = {
    showcFmodal: false,
    showModal: false,
    prevProps: '',
    prevState: '',
    modal: '',
    countDown: 10
  }
  timer: any = ''
  countDownTime = 100000

  createFolderModal = () => {
    console.log('hi')
    this.setState({ showcFmodal: true, showModal: true })
  }

  handleCFClose = () => {
    this.setState({ showcFmodal: false, showModal: false })
  }

  onItemClick = (e: any) => {
    switch (e.target.textContent) {
      case 'پوشه جدید':
        this.setState({ modal: 'createFolder', showModal: true })
        break
      case 'انتقال':
        this.setState({ modal: 'move', showModal: true })
        break
      case 'حذف':
        this.setState({ modal: 'remove', showModal: true })
        this.timer = setTimeout(() => {
          this.onRemoveDocument();
          this.timer = 0;
        }, this.countDownTime)

        break
      default:
        break
    }
  }
  onCancle = () => {
     this.setState({ modal: '', countDownTime: 10000 })
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  onRemoveDocument = async () => {
    try {
      let result = await this.props.removeFolder({ folderId: this.props.selection })
      this.setState({ showRemove: false })
    } catch (error) {
      console.log('E: ', error)
    }
  }

  render() {
    let modal
    switch (this.state.modal) {
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleCFClose} showModal={this.state.showModal} />
        break
      case 'remove':
        modal = (
          <Toast level={'success'} caret={false}>
            <CountdownTimer startTimeInSeconds={this.state.countDown} />
            پوشه حذف شد
            <div className={styles.undo} onClick={this.onCancle}>
              انصراف
            </div>
          </Toast>
        )
        break
      default:
        break
    }

    return (
      <div>
        <Navbar />
        <Sidebar onItemClick={this.onItemClick} />
        <Main showModal={this.state.showModal}>
          <Content />
          <LangSwitcher />
        </Main>
        {modal}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, selection: state.selection.selection })

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFolder: (value: any) => dispatch(removeFolder(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
