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
  setDocuments
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
    if (this.props.location.pathname === '/fm' || this.props.location.pathname === '/fm/' || this.props.location.pathname === '/fm/cfs' ||this.props.location.pathname.includes('preview')) {
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
let table= [{"boost":{},"cfsFullPath":"/1212313.jpg","createdAt":1562484257993,"deleted":false,"description":"dsd","discriminator":"F","docLocations":[{"createdAt":1562484258020,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562484258012,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":20,"favourite":false,"fullPath":"/1212313.jpg","genericType":"image","hasPassword":false,"id":63371809,"mimeType":"image/jpeg","name":"1212313.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":137,\"FormatName\":\"JPEG\",\"width\":1061,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":9301,"subdomain":false,"treePath":"63371809","updatedAt":1563087626639,"uuid":"1ZCewsTv6t"},{"boost":{},"cfsFullPath":"/1463659_641432705880124_1052296591_n.jpg","createdAt":1562503372267,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562503372310,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562503372306,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":17,"favourite":false,"fullPath":"/1463659_641432705880124_1052296591_n.jpg","genericType":"image","hasPassword":false,"id":63373095,"mimeType":"image/jpeg","name":"1463659_641432705880124_1052296591_n.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":334,\"FormatName\":\"JPEG\",\"width\":720,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":51720,"subdomain":false,"treePath":"63373095","updatedAt":1562503374207,"uuid":"wLCk6QTiL5"},{"boost":{},"cfsFullPath":"/231.jpg","createdAt":1562496487355,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562496487394,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562496487388,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/231.jpg","genericType":"image","hasPassword":false,"id":63372580,"mimeType":"image/jpeg","name":"231.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":821,\"FormatName\":\"JPEG\",\"width\":564,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":86248,"subdomain":false,"treePath":"63372580","updatedAt":1562496488161,"uuid":"j46aiiBfKZ"},{"boost":{},"cfsFullPath":"/7a5eeccd20a339c7cee9ea60230c698f.jpg","createdAt":1562484218835,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562484218917,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562484218904,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":20,"favourite":false,"fullPath":"/7a5eeccd20a339c7cee9ea60230c698f.jpg","genericType":"image","hasPassword":false,"id":63371806,"mimeType":"image/jpeg","name":"7a5eeccd20a339c7cee9ea60230c698f.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":821,\"FormatName\":\"JPEG\",\"width\":564,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":86248,"subdomain":false,"treePath":"63371806","updatedAt":1562484220214,"uuid":"Z1QnPBqAUM"},{"boost":{},"cfsFullPath":"/camphoto_869693583.jpg","createdAt":1562485437501,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562485437562,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562485437555,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/camphoto_869693583.jpg","genericType":"image","hasPassword":false,"id":63371885,"mimeType":"image/jpeg","name":"camphoto_869693583.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":4032,\"FormatName\":\"JPEG\",\"width\":3024,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":3166166,"subdomain":false,"treePath":"63371885","updatedAt":1562485441687,"uuid":"qmubOEcUB6"},{"boost":{},"cfsFullPath":"/Damahi_-_Divaneh.jpg","createdAt":1562484446327,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562484446363,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562484446353,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":20,"favourite":false,"fullPath":"/Damahi_-_Divaneh.jpg","genericType":"image","hasPassword":false,"id":63371823,"mimeType":"image/jpeg","name":"Damahi_-_Divaneh.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":1277,\"FormatName\":\"JPEG\",\"width\":1280,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":221616,"subdomain":false,"treePath":"63371823","updatedAt":1562484447077,"uuid":"qwI8f65l13"},{"boost":{},"cfsFullPath":"/ddd.jpg","createdAt":1562483528891,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562483528918,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562483528911,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":20,"favourite":false,"fullPath":"/ddd.jpg","genericType":"image","hasPassword":false,"id":63371764,"mimeType":"image/jpeg","name":"ddd.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":221,\"FormatName\":\"JPEG\",\"width\":618,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":24064,"subdomain":false,"treePath":"63371764","updatedAt":1562483529312,"uuid":"ABF17s6lfd"},{"boost":{},"cfsFullPath":"/esdsd.jpg","createdAt":1562484496051,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562484496075,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562484496069,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":20,"favourite":false,"fullPath":"/esdsd.jpg","genericType":"image","hasPassword":false,"id":63371831,"mimeType":"image/jpeg","name":"esdsd.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":1200,\"FormatName\":\"JPEG\",\"width\":1200,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":224285,"subdomain":false,"treePath":"63371831","updatedAt":1562484496547,"uuid":"N3xOPbQIcZ"},{"boost":{},"cfsFullPath":"/IMG_4730.jpg","createdAt":1562484877715,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562484877906,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562484877898,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/IMG_4730.jpg","genericType":"image","hasPassword":false,"id":63371855,"mimeType":"image/jpeg","name":"IMG_4730.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":1306,\"FormatName\":\"JPEG\",\"width\":1307,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":431924,"subdomain":false,"treePath":"63371855","updatedAt":1562484878685,"uuid":"VkO38IhfKP"},{"boost":{},"cfsFullPath":"/jbhvhv.jpg","createdAt":1562496364646,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562496364802,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562496364796,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/jbhvhv.jpg","genericType":"image","hasPassword":false,"id":63372573,"mimeType":"image/jpeg","name":"jbhvhv.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":1200,\"FormatName\":\"JPEG\",\"width\":1200,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":224285,"subdomain":false,"treePath":"63372573","updatedAt":1562496365266,"uuid":"ZM45Lx5t9L"},{"boost":{},"cfsFullPath":"/jh.jpg","createdAt":1562492018526,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562492018589,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562492018582,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/jh.jpg","genericType":"image","hasPassword":false,"id":63372312,"mimeType":"image/jpeg","name":"jh.jpg","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":221,\"FormatName\":\"JPEG\",\"width\":618,\"colorDepth\":24}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":24064,"subdomain":false,"treePath":"63372312","updatedAt":1562492018930,"uuid":"yiL4DZfa7f"},{"boost":{},"cfsFullPath":"/Screen_Shot_2019-06-22_at_9.44.52_AM_copy.png","createdAt":1562486053919,"deleted":false,"discriminator":"F","docLocations":[{"createdAt":1562486053944,"location":{"name":"fr-cdn"},"transferStatus":"INPROGRESS"},{"createdAt":1562486053936,"location":{"name":"us-cdn"},"transferStatus":"SUCCESS"}],"downloadCount":19,"favourite":false,"fullPath":"/Screen_Shot_2019-06-22_at_9.44.52_AM_copy.png","genericType":"image","hasPassword":false,"id":63371923,"mimeType":"image/png","name":"Screen_Shot_2019-06-22_at_9.44.52_AM_copy.png","owner":{"displayName":"shahz","id":62443905,"md5":"f6865c9db3d5f4d96c9341fd23422f31"},"preview":true,"properties":"{\"height\":155,\"FormatName\":\"png\",\"width\":1108,\"colorDepth\":32}","purchased":false,"shared":false,"sharingStatus":"PUBLIC","size":26473,"subdomain":false,"treePath":"63371923","updatedAt":1562486054141,"uuid":"oqFfJZqIYY"}]
    this.setState({ showMore: this.state.table.length > 10 ? true : false ,table,filteredTable:table})
    this.props.setDocuments(table)
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
      { label: t`دانلود فایل` },
      { label: t`تغییر نام`, onClick: this.openModal },
      { label: t`افزودن توضیح` },
      { label: t`دریافت لینک‌ها` },
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
          loading={!this.props.loading}
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
  fullScreen: state.selection.fullScreen
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
