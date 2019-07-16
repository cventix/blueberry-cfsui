import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// components
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import { ContentHeader } from './ContentHeader'
import ContentBody from './ContentBody'

// Services
import {
  getDocuments,
  setSidebarItems,
  getTrashDocuments,
  getSharedDocuments,
  setParentId,
  setEditStatus,
  setRenameText,
  removeFolder,
  uploadServer,
  setDocuments,
  generateDownloadLink
} from '../../services/internal/store/actions'

import { setSelections, removeSelection, setToggle, selectAll } from '../../services/internal/store/actions/selections'
import { IGenerateLinkInput, IRenameFolderInput, IRemoveFolderInput } from '../../services/internal/repositories/documents'
import { sortData } from '../../services/internal/utils/sortData'

// styles & icons
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import styles from './Content.module.scss'

import ModalContent from './SubContent/ModalContent'
import { ItemInterface } from '../../services/internal/store/reducers/documentReducer'
import toast from '../../components/ui-elements/Toast/Toast'

// const uploader = new FineUploaderTraditional({
//   options: {
//       chunking: {
//           enabled: true
//       },
//       deleteFile: {
//           enabled: true,
//           endpoint: '/uploads'
//       },
//       request: {
//           endpoint: 'http://cdn.persiangig.com:9234/uploads'
//       },

//       retry: {
//           enableAuto: true
//       }
//   }
// })
export interface IProps {
  getDocuments?: any
  data?: any
  history?: any
  setEditStatus?: any
  location?: any
  item: ItemInterface
  document?: any
  loading?: boolean
  setSelections: (e: Array<number>) => void
  removeFolder?: any
  setRenameText?: any
  setItem: (e: any) => void
  selection: Array<number>
  image?: string
  removeSelection?: any
  getSharedDocuments?: any
  getTrashDocuments?: any
  setToggle?: any
  setParentId?: any
  selectAll?: any
  uploadServer?: any
  setDocuments?: any
  downloadToken?: any
  generateDownloadLink?: any
}

export interface navigateObject {
  e: any
  name?: string
  id?: number
  item?: any
  uuid?: string
}

export interface IState {
  table: any
  checkAll: boolean
  view: string
  ascendingSize: boolean
  ascendingDate: boolean
  ascendingName: boolean
  showMore: boolean
  selectedArray: number[]
  [key: string]: any
}

class Content extends React.Component<IProps, IState> {
  step = 10
  uploader: any

  constructor(props: any) {
    super(props)
    this.state = {
      table: [],
      filteredTable: [],
      checkAll: false,
      selectedArray: [],
      view: localStorage.getItem('displayView') ? localStorage.getItem('displayView') || '{}' : 'grid',
      showMore: false,
      modalView: '',
      ascendingSize: false,
      ascendingDate: true,
      ascendingName: false,
      name: '',
      showModal: false,
      showToaster: false,
      description: '',
      showToast: false,
      message: '',
      toRemove: []
    }
  }

  async componentDidMount() {
    if (
      this.props.location.pathname === '/fm' ||
      this.props.location.pathname === '/fm/' ||
      this.props.location.pathname === '/fm/cfs' ||
      this.props.location.pathname.includes('preview')
    ) {
      this.onGetDocument(false)
      this.props.setToggle([false, false])
      this.setState({ table: this.props.data })
    } else {
      if (this.props.location.pathname.split('/fm/')[1].includes('trash')) {
        this.props.getTrashDocuments()
        this.props.setToggle([false, true])
      } else if (this.props.location.pathname.split('/fm/')[1].includes('shared')) {
        this.props.getSharedDocuments()
        this.props.setToggle([true, false])
      } else {
        this.onGetDocument(true, this.props.location.pathname.split('/fm/')[1], this.props.item.id)
      }
    }
    document.title = "میزبانی فایل"
  }

  /**back button */
  componentDidUpdate(prevProps: any) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname.includes('/fm') &&
      !prevProps.location.pathname.includes('/preview') &&
      !this.props.location.pathname.includes('/preview')
    ) {
      if (!this.props.location.pathname.split('/fm')[1] || this.props.location.pathname.split('/fm')[1] == '/') {
        this.onGetDocument(false)
        this.props.setToggle([false, false])
      } else if (
        this.props.location.pathname.split('/fm')[1] !== '/trash' &&
        this.props.location.pathname.split('/fm')[1] !== '/shared' &&
        this.props.location.pathname.includes('/preview')
      ) {
        console.log(this.props.location.pathname.split('/fm')[1])
        this.onGetDocument(true, this.props.location.pathname.split('/fm/')[1], this.props.item.id)
      }
    } else if (this.props.location.pathname.includes('/preview') && this.state.modalView === '') {
      this.props.history.push('/fm')
    }
  }

  /**
   * gets documnet if children goes inside folder
   */
  onGetDocument = async (isChildren?: boolean, path?: any, parentId?: number) => {
    if (localStorage.getItem('token')) {
      if (isChildren == true) {
        try {
          this.props.setParentId(parentId)
          await this.props.getDocuments({ isChildren: true, path, parentId })
        } catch (error) {
          console.log('E: ', error)
        }
      } else {
        try {
          this.props.setParentId(0)
          await this.props.getDocuments()
        } catch (error) {
          console.log('E: ', error)
        }
      }
    }
  }

  /**
   * gets data and makes an obj
   * @param nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }

    if (nextProps.downloadToken && nextProps.downloadToken.length > 0)
      window.location.href = `http://cdn.persiangig.com/dl/${nextProps.downloadToken}/${this.props.item.uuid}/${this.props.item.name}`

    if (nextProps.selection.length == 0 || (nextProps.selection.length > 0 && nextProps.document.documents !== this.state.mainTable)) {
      this.setState({
        table: nextProps.document.documents,
        showMore: nextProps.document.documents.length > 10,
        mainTable: nextProps.document.documents,
        filteredTable: nextProps.document.documents
      })
    }
  }

  //sort types
  onSort = (sortBy: string) => {
    let table = this.state.table
    switch (sortBy) {
      case t`نام`:
        table = sortData(table, sortBy, this.state.ascendingName)
        this.setState({
          ascendingName: !this.state.ascendingName
        })
        break
      case t`حجم`:
        table = sortData(table, sortBy, this.state.ascendingSize)
        this.setState({
          ascendingSize: !this.state.ascendingSize
        })

        break
      case t`تاریخ`:
        table = sortData(table, sortBy, this.state.ascendingDate)
        this.setState({
          ascendingDate: !this.state.ascendingDate
        })
        break
    }

    this.setState({
      table,
      mainTable: table,
      filteredTable: this.state.table
    })
  }
  handleChange = (event: any) => {
    this.props.setRenameText({ [event.target.name]: event.target.value })
  }

  //on check all documents and uncheck
  onCheckAll = () => {
    let ids = this.state.table.map((a: any) => a.id)
    if (this.props.selection.sort().toString() !== ids.sort().toString()) {
      this.props.setSelections(ids)
      this.props.selectAll(true)
    } else {
      this.props.removeSelection()
      this.props.selectAll(false)
    }
  }

  //switch between grid and list
  switchView = (view: string) => {
    this.setState({ view })
    localStorage.setItem('displayView', view)
  }

  // navigate to directories
  handleNavigate = ({ e, name, id, item }: navigateObject) => {
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.state.table.filter((obj: any) => {
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.props.history.push(`${this.props.history.location.pathname}/${name}`)
        this.onGetDocument(true, `${this.props.history.location.pathname.split('fm/')[1]}`, item.id)
      } else {
        this.props.history.push(`fm/preview/${item.genericType}${item.genericType === 'image' ? '/' + this.props.image : ''}/${name}`)
        this.props.setItem(item)
        this.setState({ modalView: 'previewModal', previewId: id, fileName: name, [`item${id}`]: item })
      }
    }
  }

  onOpenCFModal = () => {
    this.setState({ modalView: 'createFolder', showModal: true })
  }

  updateTable = (table: any) => {
    if (this.state.table !== table) this.setState({ table })
    this.closeModal()
  }

  // open modal
  openModal = (renameFileId: number, modalView?: string) => {
    let item = this.state.table.filter((obj: any) => {
      return obj.id === renameFileId
    })[0]
    this.props.setItem(item)
    // if (modalView == t`تغییر نام`) this.props.setEditStatus(renameFileId)
    // else
    this.setState({ modalView, showModal: true })
  }
  downloadFile = async (fileId: number) => {
    console.log(fileId)
    let item = this.state.table.filter((obj: any) => {
      return obj.id === fileId
    })[0]
    this.props.setItem(item)
    let uuid = item.uuid
    let result = await this.props.generateDownloadLink(uuid)
  }
  // handle search
  onChangeSearchInput = (val: string) => {
    let filteredTable = this.state.table.filter((obj: any) => {
      return obj.cfsFullPath.includes(val)
    })
    this.setState({
      filteredTable
    })
  }

  onRemoveDocument = async (fileId: number) => {
    let table = this.state.table

    try {
      let result = await this.props.removeFolder({ folderId: fileId })
      table = table.filter((x: any) => x.id !== fileId)
      this.updateTable({ table })
      toast.success('حذف شد')
    } catch (error) {
      console.log('E: ', error)
    }
  }
  // on item check
  onCheck = (id: number) => {
    let selectedArray = this.props.selection
    if (selectedArray.indexOf(id) === -1) selectedArray.push(id)
    else
      selectedArray = selectedArray.filter((obj: any) => {
        return obj !== id
      })
    this.props.setSelections(selectedArray)
    this.setState({ selectedArray })
  }

  closeModal = () => {
    if (this.state.modalView) this.setState({ modalView: '' })
  }

  public render() {
    let dropDownData = [
      { label: t`دانلود فایل`, onClick: this.downloadFile },
      { label: t`تغییر نام`, onClick: this.openModal },
      { label: t`حذف فایل`, onClick: this.onRemoveDocument }
    ]

    return (
      <React.Fragment>
        <ContentHeader
          view={this.state.view}
          switchView={this.switchView}
          table={this.state.filteredTable}
          handleSearchInput={(e: any) => this.onChangeSearchInput(e)}
        />

        <ContentBody
          onCheckAll={this.onCheckAll}
          onCheck={this.onCheck}
          view={this.state.view}
          onOpenCFModal={this.onOpenCFModal}
          table={this.state.filteredTable}
          dropDownData={dropDownData}
          handleChange={this.handleChange}
          loading={this.props.loading}
          openModal={this.openModal}
          loadingStyle={styles.loading}
          onSort={this.onSort}
          handleNavigate={this.handleNavigate}
        />
        {this.state.modalView && (
          <ModalContent
            history={this.props.history}
            closeModal={this.closeModal}
            modalView={this.state.modalView}
            table={this.state.table}
            updateTable={this.updateTable}
          />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  document: state.document,
  loading: state.loading.isLoading,
  item: state.sidebar.item,
  image: state.sidebar.image,
  selection: state.selection.selection,
  fullScreen: state.selection.fullScreen,
  downloadToken: state.sidebar.downloadToken
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: IGenerateLinkInput) => dispatch(getDocuments(value)),
    setSelections: (value: Array<number>) => dispatch(setSelections(value)),
    setItem: (value: any) => dispatch(setSidebarItems(value)),
    removeSelection: () => dispatch(removeSelection()),
    getTrashDocuments: () => dispatch(getTrashDocuments()),
    setToggle: (value: any) => dispatch(setToggle(value)),
    getSharedDocuments: () => dispatch(getSharedDocuments()),
    setParentId: (value: any) => dispatch(setParentId(value)),
    setEditStatus: (value: any) => dispatch(setEditStatus(value)),
    selectAll: (value: boolean) => dispatch(selectAll(value)),
    setRenameText: (value: any) => dispatch(setRenameText(value)),
    removeFolder: (value: IRemoveFolderInput) => dispatch(removeFolder(value)),
    uploadServer: (value: any) => dispatch(uploadServer(value)),
    setDocuments: (value: any) => dispatch(setDocuments(value)),
    generateDownloadLink: (value: IGenerateLinkInput) => dispatch(generateDownloadLink(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
