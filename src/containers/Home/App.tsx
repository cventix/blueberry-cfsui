import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'

import { Main } from '../../components/Main/Main'
import './App.css'
import styles from '../../components/Content/Content.module.scss'

import Content from '../../components/Content/Content'
import VMContent from '../../components/VMContent/VMContent'
import Order from '../../components/VMContent/components/Order/Order'
import GiftCard from '../../components/VMContent/components/GiftCard/GiftCard'
import { Table } from '../../components/Table/Table'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import { Preview } from '../../components/ui-elements/Preview/Preview'
import icon from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import CFModal from '../../components/ui-elements/Modal/CreateFolderModal/CreateFolder'
// Services
import { bottle } from '../../services'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setRouter } from '../../services/internal/store/actions/router'

import toast from '../../components/ui-elements/Toast/Toast'

import {
  setUserCredentials,
  setToken,
  login,
  removeFolder,
  signout,
  getTrashDocuments,
  getSharedDocuments,
  setPreviewImage,
  generateDownloadLink,
  restoreFiles,
  setDocuments,
  setTempDocuments
} from '../../services/internal/store/actions'
import { DocumentsInterface } from '../../services/internal/repositories/documents'

import Toast from '../../components/ui-elements/Toast/Toast'
import { CountdownTimer } from '../../components/ui-elements/CountdownTimer/CountdownTimer'
import { UploadModal } from '../../components/ui-elements/Uploadmodal/Uploadmodal'
import MoveFile from '../../components/ui-elements/Modal/MoveFileModal.tsx/MoveFile'
import { TextInput } from '../../components/ui-elements/Input/Input'
import { Button } from '../../components/ui-elements/Button/Button'
import { t } from 'ttag'
import { downloadDirectory } from '../../services/internal/store/actions'
import { setToggle } from '../../services/internal/store/actions/selections'
import { ToastUndo } from '../../components/ui-elements/Toast/ToastUndo'
const steps = ['انتخاب سیستم عامل', 'انتخاب مدت سرویس', 'انتخاب طرح', 'اطلاعات کارت شبکه', 'انتخاب نام سرور و ثبت نهایی']
const options = [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }]

class App extends Component<
  {
    login: any
    setUserInfo: any
    history?: any
    selection?: any
    setRouter?: any
    removeFolder?: any
    getTrashDocuments?: any
    getSharedDocuments?: any
    setDocuments?: any
    setPreviewImage?: any
    generateDownloadLink?: any
    item?: any
    downloadDirectory?: any
    setToggle?: any
    restoreFiles?: any
    setTempDocuments?: any
    document?: any
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
    countDown: 10,
    toRemove: []
  }
  timer: any = ''
  countDownTime = 10000

  handleClose = () => {
    this.setState({ showModal: false, modalView: '' })
  }

  undo = (id: any) => {
    this.setState({
      toRemove: this.state.toRemove.filter((v: any) => v !== id)
    })
  }

  notify = () => {
    this.setState({
      toRemove: [...this.state.toRemove, this.props.selection[0]]
    })
    let documents = this.props.document.documents.filter((i: any) => i.id !== this.props.selection[0])
    this.props.setDocuments(documents)
    toast.success(<ToastUndo undo={this.undo} id={this.props.selection[0]} />, {
      toRemove: [],
      onClose: this.cleanCollection
    })
  }
  cleanCollection = () => {
    this.onRemoveDocument()
  }
  onItemClick = async (e: any) => {
    if (!e.target) {
      console.log(e)
      switch (e) {
        case `دانلود با فرمت zip`:
          await this.props.downloadDirectory({ documentIds: this.props.selection, downloadType: 'zip' })
          break
        case `دانلود با فرمت tar`:
          await this.props.downloadDirectory({ documentIds: this.props.selection, downloadType: 'tar' })
          break
        case `دانلود با فرمت iso`:
          await this.props.downloadDirectory({ documentIds: this.props.selection, downloadType: 'iso' })
          break
        case `بازیابی فایل`:
          await this.props.restoreFiles({ documentIds: this.props.selection })
          break
        case t`پوشه جدید`:
          this.setState({ modal: 'createFolder', showModal: true })
          break
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
            // this.setState({ modal: 'remove', showModal: true })
            this.notify()
            this.props.setTempDocuments(this.props.document)
            console.log(this.props.selection[0])

            this.timer = setTimeout(() => {
              console.log(1)
              // this.onRemoveDocument()
              // this.setDocuments({})
              this.timer = 0
            }, this.countDownTime)
          } else {
            this.setState({ modal: 'noSelection', showModal: true })
          }
          break
        case t`آپلود فایل از URL`:
          this.setState({ modal: 'urlUpload', showModal: true })
        case t`بزرگ`:
        case t`سایز اصلی`:
          this.props.setPreviewImage('large')
          break
        case t`متوسط`:
          this.props.setPreviewImage('medium')
          break
        case t`کوچک`:
          this.props.setPreviewImage('small')
          break
        case t`دانلود فایل`:
          let uuid = this.props.item.uuid

          this.props.generateDownloadLink(uuid)
          break
        default:
          break
      }
    } else if (e.target.value) {
      switch (e.target.value) {
        case t`نمایش حذف شده‌ها`:
          this.props.setToggle([false, true])
          if (this.props.history.location.pathname !== '/fm/trash') {
            this.props.history.push(`/fm/trash`)
            this.props.getTrashDocuments()
          } else {
            this.props.history.push(`/fm`)
            this.props.setToggle([false, false])
          }

          break
        case t`به اشتراک گذاشته‌ شده‌ها`:
          this.props.setToggle([true, false])
          if (this.props.history.location.pathname !== '/fm/shared') {
            this.props.history.push(`/fm/shared`)
            this.props.getSharedDocuments()
          } else {
            this.props.history.push(`/fm`)
            this.props.setToggle([false, false])
          }

          break
      }
    } else if (e.target.innerText) {
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
      // case 'remove':
      //   modal = (
      //     // <Toast level={'success'} caret={false}>
      //     //   <CountdownTimer startTimeInSeconds={this.state.countDown} />
      //     //   {t`پوشه حذف شد`}
      //     //   <div className={styles.undo} onClick={this.onCancle}>
      //     //     {t`انصراف`}
      //     //   </div>
      //     // </Toast>
      //   )
      // break
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
              <Button className={['pg-btnPrimary100', 'pg-btnSm']}>{t`آپلود`}</Button>
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
            <Route exact path={`/vm/order`} component={Order} />
          </Switch>
        </Main>

        {modal}
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, selection: state.selection.selection, item: state.sidebar.item })

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFolder: (value: any) => dispatch(removeFolder(value)),
    signout: () => dispatch(signout()),
    getTrashDocuments: () => dispatch(getTrashDocuments()),
    getSharedDocuments: () => dispatch(getSharedDocuments()),
    setDocuments: (value: any) => dispatch(setDocuments(value)),
    setTempDocuments: (value: any) => dispatch(setTempDocuments(value)),
    setRouter: (value: any) => dispatch(setRouter(value)),
    setPreviewImage: (value: any) => dispatch(setPreviewImage(value)),
    generateDownloadLink: (value: any) => dispatch(generateDownloadLink(value)),
    downloadDirectory: (value: any) => dispatch(downloadDirectory(value)),
    setToggle: (value: any) => dispatch(setToggle(value)),
    restoreFiles: (value: any) => dispatch(restoreFiles(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
