import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { Main } from '../../components/Main/Main'
import { Stepbar } from '../../components/Stepbar/Stepbar'
import './App.css'
import styles from '../../components/Content/Content.module.scss'

import Content from '../../components/Content/Content'
import VMContent from '../../components/VMContent/VMContent'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import CFModal from '../../components/ui-elements/Modal/CreateFolderModal/CreateFolder'
// Services
import { bottle } from '../../services'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setRouter } from '../../services/internal/store/actions/router'

import {
  setUserCredentials,
  setToken,
  login,
  removeFolder,
  signout,
  getTrashDocuments,
  getSharedDocuments
} from '../../services/internal/store/actions'
import { DocumentsInterface } from '../../services/internal/repositories/documents'

import Toast from '../../components/ui-elements/Toast/Toast'
import { CountdownTimer } from '../../components/ui-elements/CountdownTimer/CountdownTimer'
import { UploadModal } from '../../components/ui-elements/Uploadmodal/Uploadmodal'
import MoveFile from '../../components/ui-elements/Modal/MoveFileModal.tsx/MoveFile'
import { TextInput } from '../../components/ui-elements/Input/Input'
import { Button } from '../../components/ui-elements/Button/Button'
import { t } from 'ttag'
const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component<
  {
    login: any
    setUserInfo: any
    history?: any
    selection?: any[]
    setRouter?: any
    removeFolder?: any
    getTrashDocuments?: any
    getSharedDocuments?: any
  },
  {}
> {
  private _documents: DocumentsInterface
  constructor(props: any) {
    super(props)
    this._documents = bottle.container.Documents
  }

  state = {
    isOpenMenu: false,
    isOpenSignout: false,
    showcFmodal: false,
    showModal: false,
    prevProps: '',
    prevState: '',
    modal: '',
    countDown: 10
  }
  timer: any = ''
  countDownTime = 100000

  handleClose = () => {
    this.setState({ showModal: false, modalView: '' })
  }

  onItemClick = (e: any) => {
    console.log(e.target.innerText)
    if (!e.target) {
      switch (e) {
        case t`پوشه جدید`:
          this.setState({ modal: 'createFolder', showModal: true })
          break
        case t`انتقال`:
          if (this.props.selection && this.props.selection.length > 0) {
            this.setState({ modal: 'moveFile', showModal: true })
          } else {
            this.setState({ modal: 'noSelection', showModal: true })
          }
          break
        case t`حذف`:
          if (this.props.selection && this.props.selection.length > 0) {
            this.setState({ modal: 'remove', showModal: true })
            this.timer = setTimeout(() => {
              this.onRemoveDocument()
              this.timer = 0
            }, this.countDownTime)
          } else {
            this.setState({ modal: 'noSelection', showModal: true })
          }
          break
        case t`آپلود فایل از URL`:
          this.setState({ modal: 'urlUpload', showModal: true })
        default:
          break
      }
    } else if (e.target.value) {
      switch (e.target.value) {
        case t`نمایش حذف شده‌ها`:
          if (this.props.history.location.pathname !== '/fm/trash') {
            this.props.history.push(`/fm/trash`)
            this.props.getTrashDocuments()
          } else this.props.history.push(`/fm`)

          break
        case t`به اشتراک گذاشته‌ شده‌ها`:
          if (this.props.history.location.pathname !== '/fm/shared') {
            this.props.history.push(`/fm/shared`)
            this.props.getSharedDocuments()
          } else this.props.history.push(`/fm`)

          break
      }
    }else if(e.target.innerText){
      switch (e.target.value) {
        case t`کپی کن`:
     

          break
    
      }
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

  toggleHamburgerMenu() {
    this.setState({
      isOpenMenu: !this.state.isOpenMenu
    })
  }

  toggleSignout() {
    this.setState({
      isOpenSignout: !this.state.isOpenSignout
    })
  }
  componentDidMount() {
    this.props.setRouter(this.props.history)
  }

  render() {
    let modal
    switch (this.state.modal) {
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleClose} showModal={this.state.showModal} />
        break
      case 'remove':
        modal = (
          <Toast level={'success'} caret={false}>
            <CountdownTimer startTimeInSeconds={this.state.countDown} />
            {t`پوشه حذف شد`}
            <div className={styles.undo} onClick={this.onCancle}>
              {t`انصراف`}
            </div>
          </Toast>
        )
        break
      case 'moveFile':
        modal = <MoveFile handleClose={this.handleClose} showModal={this.state.showModal} />
        break
      case 'urlUpload':
        modal = (
          <UploadModal
            show={this.state.showModal}
            width={640}
            handleClose={this.handleClose}
            title={t`آپلود از آدرس اینترنتی`}
            formDescription={t`برای آپلود آدرس اینترنتی خود را در فرم زیر وارد نمایید`}
          >
            <div className={styles.row}>
              <TextInput style={{ width: 300 }} name={'urlInput'} />
              <Button className={['btnPrimary100', 'btnSm']}>{t`آپلود`}</Button>
            </div>
          </UploadModal>
        )
        break
      case 'noSelection':
        modal = (
          <Modal show={this.state.showModal} handleClose={this.handleClose}>
            You havent selected anything
          </Modal>
        )
        break
      default:
        break
    }

    return (
      <>
        <Navbar
          toggleHamburgerMenu={() => {
            this.toggleHamburgerMenu()
          }}
          toggleSignout={() => {
            this.toggleSignout()
          }}
          open={this.state.isOpenSignout}
        />
        <Sidebar
          showModal={this.state.showcFmodal}
          onItemClick={this.onItemClick}
          handleCFClose={this.handleClose}
          open={this.state.isOpenMenu}
          onClickOverlay={() => {
            this.toggleHamburgerMenu()
          }}
        />
        <Main showModal={this.state.showModal}>
          <Switch>
            <Route path={`/fm`} component={Content} />
            <Route exact path={`/vm`} component={VMContent} />
          </Switch>
        </Main>
        {modal}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, selection: state.selection.selection })

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFolder: (value: any) => dispatch(removeFolder(value)),
    signout: () => dispatch(signout()),
    getTrashDocuments: () => dispatch(getTrashDocuments()),
    getSharedDocuments: () => dispatch(getSharedDocuments()),
    setRouter: (value: any) => dispatch(setRouter(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
