import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { t } from 'ttag'

import { Navbar } from '../../components/Navbar/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Main } from '../../components/Main/Main'
import Content from '../../components/Content/Content'
import VMContent from '../../components/VMContent/VMContent'
import Order from '../../components/VMContent/components/Order/Order'
import { Modal } from '../../components/ui-elements/Modal/Modal'
import CFModal from '../../components/ui-elements/Modal/CreateFolderModal/CreateFolder'
import { UploadModal } from '../../components/ui-elements/Uploadmodal/Uploadmodal'
import MoveFile from '../../components/ui-elements/Modal/MoveFileModal.tsx/MoveFile'
import { TextInput } from '../../components/ui-elements/Input/Input'
import { Button } from '../../components/ui-elements/Button/Button'
import { downloadDirectory, removeMessages, deleteDocument, uploadDocument } from '../../services/internal/store/actions'
import { setToggle } from '../../services/internal/store/actions/selections'
import { ToastUndo } from '../../components/ui-elements/Toast/ToastUndo'

// Services
import { setRouter } from '../../services/internal/store/actions/router'
import toast from '../../components/ui-elements/Toast/Toast'
import {
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

//styles
import './App.css'
import styles from '../../components/Content/Content.module.scss'
import { IRemoveFolderInput, IDownloadDirectoryInput, IGenerateLinkInput } from '../../services/internal/repositories/documents'

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
    downloadToken?: string
    document?: any
    match?: any
    removeMessages?: any
    deleteDocument?: any
    uploadDocument?: any
  },
  {}
> {
  constructor(props: any) {
    super(props)
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

  toRemove = () => {
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

  toErase = () => {
    this.setState({
      toRemove: [...this.state.toRemove, this.props.selection[0]]
    })
    let documents = this.props.document.documents.filter((i: any) => i.id !== this.props.selection[0])
    this.props.setDocuments(documents)
    this.onEraseDocument()
  }

  cleanCollection = () => {
    this.onRemoveDocument()
  }

  changeSize = (size: string) => {
    this.props.setPreviewImage(size)
    let urlSize = this.props.history.length > 0 && this.props.history.location.pathname.split('/')[4]
    let url
    const sizes = ['small', 'medium', 'large']
    if (!sizes.includes(urlSize)) url = this.props.history.location.pathname.replace('image/', `image/${size}/`)
    else if (size) url = this.props.history.location.pathname.replace(urlSize, size)
    else url = this.props.history.location.pathname.replace(`/${urlSize}`, size)
    this.props.history.push(url)
  }

  onItemClick = async (e: any, file: any) => {
    console.log(e)
    if (!e.target) {
      console.log(e)
      switch (e) {
        case `fileUpload`:
          console.log(file)
          const files = Array.from(file)
          console.log(files)
          const formData = new FormData()
          files.forEach((item: any, index) => {
            formData.append('file', item)
            console.log(formData)

            formData.append(`Content-Type`, 'application/x-www-form-urlencoded')
            formData.append(`Content-length`, file[0].size)
            formData.append(`token`, localStorage.getItem('token') || '{}')
            formData.append(`Cookie`, `token="${localStorage.getItem('token') || '{}'}"`)
          })
          console.log(file[0].size)
          this.props.uploadDocument({ file: formData, fileSize: file[0].size, fileName: file[0].name })
          break
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
        case t`انتقال`:
          if (this.props.selection && this.props.selection.length > 0) {
            this.setState({ modal: 'moveFile', showModal: true })
          } else {
            this.setState({ modal: 'noSelection' })
          }
          break
        case t`حذف`:
          if (this.props.selection && this.props.selection.length > 0) {
            // this.setState({ modal: 'remove', showModal: true })
            this.toRemove()
            this.props.setTempDocuments(this.props.document)
            console.log(this.props.selection[0])

            this.timer = setTimeout(() => {
              console.log(1)
              // this.onRemoveDocument()
              // this.setDocuments({})
              this.timer = 0
            }, this.countDownTime)
          } else {
            this.setState({ modal: 'noSelection' })
          }
          break
        case t`حذف دائم`:
          if (this.props.selection && this.props.selection.length > 0) {
            // this.setState({ modal: 'remove', showModal: true })
            this.toErase()
          }
          break
        case t`آپلود فایل از URL`:
          this.setState({ modal: 'urlUpload', showModal: true })
        case t`بزرگ`:
          this.changeSize('large')
          break
        case t`سایز اصلی`:
          this.changeSize('')
          break
        case t`متوسط`:
          this.changeSize('medium')
          break
        case t`کوچک`:
          this.changeSize('small')
          break
        case t`دانلود فایل`:
          let uuid = this.props.item.uuid
          let result = await this.props.generateDownloadLink(uuid)
          setTimeout(() => {
            if (result && this.props.downloadToken && this.props.downloadToken.length > 0)
              window.location.href = `http://cdn.persiangig.com/dl/${this.props.downloadToken}/${this.props.item.uuid}/${this.props.item.name}`
          }, 1000)
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
    } else if (e.target.files) {
      console.log(e.target.files)
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
  onEraseDocument = async () => {
    try {
      let result = await this.props.deleteDocument({ folderId: this.props.selection })
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
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.messages.errors.length > 0) {
      toast.error(nextProps.messages.errors)
      this.props.removeMessages()
    }

    if (nextProps.messages.msgs.length > 0) {
      toast.success(nextProps.messages.msgs)
      this.props.removeMessages()
    }
  }
  render() {
    let modal
    switch (this.state.modal) {
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleClose} showModal={this.state.showModal} />
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
        toast.error('You havent selected anything')

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

const mapStateToProps = (state: any) => ({
  document: state.document,
  selection: state.selection.selection,
  item: state.sidebar.item,
  messages: state.messages,
  downloadToken: state.sidebar.downloadToken
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeFolder: (value: IRemoveFolderInput) => dispatch(removeFolder(value)),
    deleteDocument: (value: any) => dispatch(deleteDocument(value)),
    generateDownloadLink: (value: IGenerateLinkInput) => dispatch(generateDownloadLink(value)),
    downloadDirectory: (value: IDownloadDirectoryInput) => dispatch(downloadDirectory(value)),
    signout: () => dispatch(signout()),
    getTrashDocuments: () => dispatch(getTrashDocuments()),
    getSharedDocuments: () => dispatch(getSharedDocuments()),
    setDocuments: (value: any) => dispatch(setDocuments(value)),
    setTempDocuments: (value: any) => dispatch(setTempDocuments(value)),
    setRouter: (value: any) => dispatch(setRouter(value)),
    setPreviewImage: (value: any) => dispatch(setPreviewImage(value)),
    setToggle: (value: any) => dispatch(setToggle(value)),
    restoreFiles: (value: any) => dispatch(restoreFiles(value)),
    removeMessages: () => dispatch(removeMessages()),
    uploadDocument: (value: any) => dispatch(uploadDocument(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
