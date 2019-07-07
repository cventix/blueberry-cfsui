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
import { UploadModal } from '../../components/ui-elements/Modal/Uploadmodal/Uploadmodal'
import MoveFile from '../../components/ui-elements/Modal/MoveFileModal.tsx/MoveFile'
import { TextInput } from '../../components/ui-elements/Input/Input'
import { Button } from '../../components/ui-elements/Button/Button'
import { downloadDirectory, removeMessages, deleteDocument, uploadDocument, urlUpload, uploadServer, setUploader } from '../../services/internal/store/actions'
import { setToggle, removeSelection } from '../../services/internal/store/actions/selections'
import { ToastUndo } from '../../components/ui-elements/Toast/ToastUndo/ToastUndo'
import toast from '../../components/ui-elements/Toast/Toast'
import UrlUploadmodal from '../../components/ui-elements/Modal/urlUpload/urlUploadModal'
// Services
import { setRouter } from '../../services/internal/store/actions/router'
import FineUploaderTraditional from 'fine-uploader-wrappers'

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
import urlUploadModal from '../../components/ui-elements/Modal/urlUpload/urlUploadModal'
import Account from '../Account/Account'
import FileUploadModal from '../../components/ui-elements/Modal/FileUploadModal/FileUploadModal'
function readFileDataAsBase64(e: any) {
  const file = e[0]

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event: any) => {
      resolve(event.target.result)
    }

    reader.onerror = err => {
      reject(err)
    }

    reader.readAsDataURL(file)
  })
}

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
    urlUpload?: any
    removeSelection?: any
    uploadServer?: any
    setUploader?: any
    uploader?: any
  },
  {}
> {
  uploader: any
  constructor(props: any) {
    super(props)
    this.uploader = new FineUploaderTraditional({
      options: {
        autoUpload: true,
        maxConnections: 3,
        disableCancelForFormUploads: true,
        chunking: {
          enabled: true,
          partSize: 128000,
          concurrent: {
            enabled: false
          }
        },

        request: {
          endpoint: `http://cdn.persiangig.com:9234/uploads`
        },
        callbacks: {
          onComplete: (id: any, name: any, result: any) => {
            console.log(id)
            const { uploadServer } = this.props
            const size = this.uploader.methods.getSize(id)
            const uuid = this.uploader.methods.getUuid(id)
            const parent = 0

            uploadServer({ name, size, id, uuid, parent })
          }
        }
      },
      extraButtons: [
        {
          element: document.getElementById('upload')
        }
      ]
    })
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
    toRemove: [],
    removeItem: [],
    removedIndex: 0,
    uploadModal: false
  }
  timer: any = ''
  countDownTime = 10000

  handleClose = () => {
    this.setState({ showModal: false, modalView: '' })
  }
  componentDidMount() {
    this.props.setUploader(this.uploader)
  }

  undo = (ids: any) => {
    let documents = this.props.document.documents

    console.log(ids)
    this.setState({
      toRemove: this.state.toRemove.filter((v: any, index: number) => v[index] !== ids[index])
    })
    this.props.removeSelection()
    this.state.removeItem.map((each: any, index) => {
      documents.splice(this.state.removedIndex + index, 0, each)
    })

    this.props.setDocuments(documents)
  }

  toRemoveFromList = async (type: string) => {
    let removeItem = this.props.document.documents.filter((obj: any, index: number) => {
      return this.props.selection.includes(obj.id)
    })

    let removedIndex = this.props.document.documents.indexOf(removeItem[0])
    this.setState({
      toRemove: [...this.state.toRemove, this.props.selection],
      removeItem,
      removedIndex
    })
    let documents = this.props.document.documents.filter((i: any, index: number) => !this.props.selection.includes(i.id))
    this.props.setDocuments(documents)
    console.log(type)
    let deleteMsg = 'فایل حذف شد'
    let recoverMsg = 'فایل بازیابی شد'
    toast.success(<ToastUndo undo={this.undo} id={this.props.selection} msg={type == `بازیابی فایل` ? recoverMsg : deleteMsg} />, {
      toRemove: [],
      onClose:
        type == t`حذف`
          ? this.onRemoveDocument
          : t`حذف دائم`
          ? this.onEraseDocument
          : `بازیابی فایل`
          ? await this.props.restoreFiles({ documentIds: this.props.selection })
          : ''
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
    console.log(this.state.toRemove)
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
        case t`آپلود فایل`:
          console.log(this.props.uploader)
          this.setState({ modal: 'uploadModal', showModal: true })
          // this.props.uploadDocument({ file: readFileDataAsBase64(file), fileSize: file[0].size, fileName: file[0].name })
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
          this.toRemoveFromList(e)
          break
        case t`پوشه جدید`:
          this.setState({ modal: 'createFolder', showModal: true })
          break
        case t`انتقال`:
          if (this.props.selection && this.props.selection.length > 0) {
            this.setState({ modal: 'moveFile', showModal: true })
          } else {
            toast.error('You havent selected anything')
          }
          break
        case t`حذف`:
          if (this.props.selection && this.props.selection.length > 0) {
            this.toRemoveFromList(e)
            this.props.setTempDocuments(this.props.document)
          } else {
            toast.error('You havent selected anything')
          }
          break
        case t`حذف دائم`:
          this.toRemoveFromList(e)
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
    let table = this.props.document.documents
    if (this.state.toRemove.length > 0)
      try {
        let result = await this.props.removeFolder({ folderId: this.state.toRemove })
        table = table.filter((x: any, index: number) => x.id !== result.payload.folderId[index])
        this.props.setDocuments(table)
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

  componentWillReceiveProps(nextProps: any, prevProps: any) {
    console.log(prevProps)
    console.log(prevProps.history && nextProps.history.location.pathname !== prevProps.history.location.pathname)
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
        modal = <UrlUploadmodal showModal={this.state.showModal} handleCFClose={this.handleClose} />
        break
      case 'uploadModal':
        modal = <FileUploadModal handleCFClose={this.handleClose} showModal={this.state.showModal} />
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
          onItemClick={this.onItemClick}
          open={this.state.isOpenMenu}
          onClickOverlay={() => {
            this.toggleHamburgerMenu()
          }}
        />
        <Main showModal={this.state.showModal}>
          <Switch>
            <Route path={`/account`} component={Account} />
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
  downloadToken: state.sidebar.downloadToken,
  uploader :state.document.uploader
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
    uploadDocument: (value: any) => dispatch(uploadDocument(value)),
    urlUpload: (value: any) => dispatch(urlUpload(value)),
    removeSelection: () => dispatch(removeSelection()),
    uploadServer: (value: any) => dispatch(uploadServer(value)),
    setUploader: (value: any) => dispatch(setUploader(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
