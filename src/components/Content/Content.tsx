import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { t } from 'ttag'

// components
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import { UploadModal } from '../ui-elements/Uploadmodal/Uploadmodal'
import { RenameFile } from '../ui-elements/Modal/ModalContent/RenameFile'
import { Icon } from '../ui-elements/Icon'
import { ContentHeader } from './ContentHeader'
import { ContentBody } from './ContentBody'
import CFModal from '../ui-elements/Modal/CreateFolderModal/CreateFolder'

// Services

import {
  getDocuments,
  createFolder,
  renameFolder,
  removeFolder,
  moveDocuments,
  shareDocuments,
  setSidebarItems,
  getTrashDocuments,
  getSharedDocuments,
  generateDownloadLink,
  setParentId
} from '../../services/internal/store/actions'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { sliceData } from '../../services/internal/utils/sliceData'
import { setSelections, removeSelection, setToggle } from '../../services/internal/store/actions/selections'

// styles & icons

import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import styles from './Content.module.scss'
import { Preview } from '../ui-elements/Preview/Preview'
import image from '../../images/image.jpg'
import ShareModal from '../ui-elements/Modal/ShareModal.tsx/ShareModal'
import { IGenerateLinkInput } from '../../services/internal/repositories/documents'
import MyVideoPlayer from '../MediaPlayer/MediaPlayer'
const sort = (data: object[]) => {
  var sortOrder = ['folder', 'image', 'music']
  data.sort(function(a: any, b: any) {
    return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type)
  })
  return data
}

export interface IProps {
  getDocuments?: any
  createFolder?: any
  renameFolder?: any
  moveDocuments?: any
  shareDocuments?: any
  removeFolder?: any
  fullScreen?: any
  data?: any
  history?: any
  location?: any
  prevProps?: any
  item?: any
  prevState?: any
  document?: any
  loading?: boolean
  auth?: any
  setSelections?: any
  setItem?: any
  selection?: any
  image?: any
  removeSelection?: any
  getSharedDocuments?: any
  getTrashDocuments?: any
  onItemClick?: any
  setToggle?: any
  generateDownloadLink?: any
  downloadToken?: string
  setParentId?: any
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
  width: number
  height: number
  optionSelected?: number
  ascendingSize: boolean
  ascendingDate: boolean
  ascendingName: boolean
  showMore: boolean
  selectedArray: number[]
  [key: string]: any
}

const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [
    {
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }
  ]
}

class Content extends React.Component<IProps, IState> {
  step = 10
  timer: any = 0
  countDownTime = 3000
  constructor(props: any) {
    super(props)
    this.state = {
      table: [],
      filteredTable: [],
      checkAll: false,
      selectedArray: [],
      view: 'grid',
      width: 0,
      height: 0,
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
      message: ''
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  async componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    if (this.props.location.pathname === '/fm' || this.props.location.pathname === '/fm/') {
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
      } else this.onGetDocument(true, this.props.location.pathname.split('/fm/')[1], this.props.item.id)
    }

    this.setState({ showMore: this.state.table.length > 10 ? true : false })
  }

  /**back button */
  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.props.location.pathname.includes('/fm') &&
      !prevProps.location.pathname.includes('/preview') &&
      !this.props.location.pathname.includes('/preview')
    ) {
      if (!this.props.location.pathname.split('/fm')[1] || this.props.location.pathname.split('/fm')[1] == '/') {
        this.onGetDocument(false)
        this.props.setToggle([false, false])
      }
      this.onGetDocument(true, this.props.location.pathname.split('/fm/')[1], this.props.item.id)
    }
  }

  /**
   * gets documnet if children goes inside folder
   */
  onGetDocument = async (isChildren?: boolean, path?: any, parentId?: number) => {
    if (isChildren == true) {
      try {
        this.props.setParentId(parentId)
        await this.props.getDocuments({ isChildren: true, path, parentId })
      } catch (error) {
        console.log('E: ', error)
      }
    } else {
      try {
        this.props.setParentId(1)
        await this.props.getDocuments()
      } catch (error) {
        console.log('E: ', error)
      }
    }
  }
  turnOffbutton = () => {
    if (this.state.showMore !== false) this.setState({ showMore: false })
  }
  /**
   * gets data and makes an obj
   * @param nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    if (nextProps.item) {
      this.setState({
        item: nextProps.item
      })
    }

    if (nextProps.selection.length == 0 || (nextProps.selection.length > 0 && nextProps.document.documents !== this.state.mainTable)) {
      console.log('aha')
      this.setState({
        table: sliceData({ array: nextProps.document.documents }),
        showMore: nextProps.document.documents.length > 10,
        mainTable: nextProps.document.documents,
        filteredTable: sliceData({ array: nextProps.document.documents })
      })
    }
  }

  // show more button function
  showMore = () => {
    this.setState({
      filteredTable: sliceData({ array: this.state.mainTable, choppedArray: this.state.table }),
      showMore: Math.ceil(this.state.mainTable.length / this.step) - 1 === Math.ceil(this.state.table.length / 10) ? false : true
    })
  }

  /**
   * set view according to viewport
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    if (!this.props.fullScreen) this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onSort = (sortBy: string, type?: string) => {
    let table = this.state.table
    switch (sortBy) {
      case t`نام`:
        table &&
          table.sort((a: any, b: any) => {
            if (this.state.ascendingDate) {
              if (a.name < b.name) {
                return -1
              }
              if (a.name > b.name) {
                return 1
              }
              return 0
            } else {
              if (b.name < a.name) {
                return -1
              }
              if (b.name > a.name) {
                return 1
              }
              return 0
            }
          })
        break
      case t`حجم`:
        table.sort((a: any, b: any) => {
          if (a.size) {
            if (this.state.ascendingSize) return b.size - a.size
            else return a.size - b.size
          }
        })
        break
      case t`تاریخ`:
        table.sort((a: any, b: any) => {
          if (this.state.ascendingDate) return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          else return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        break
    }

    this.setState({
      table: sliceData({ array: table }),
      mainTable: table,
      filteredTable: this.state.table,
      ascendingSize: !this.state.ascendingSize,
      ascendingDate: !this.state.ascendingDate,
      ascendingName: !this.state.ascendingName
    })
  }

  //on check all documents and uncheck
  onCheckAll = () => {
    let ids = this.state.table.map((a: any) => a.id)
    if (this.props.selection.sort().toString() !== ids.sort().toString()) this.props.setSelections(ids)
    else this.props.removeSelection()
  }

  //switch between grid and list
  switchView = (view: string) => {
    this.setState({ view })
  }

  onSelect = (optionSelected: number) => {
    this.setState({ optionSelected })
  }

  // navigate to directories
  handleNavigate = ({ e, name, id, uuid, item }: navigateObject) => {
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

  onRenameDocument = async (e: any) => {
    if (e) e.preventDefault()
    let table = this.state.table
    try {
      let result = await this.props.renameFolder({ folderId: this.state.renameFileId, name: this.state.renameInput })
      table.map((each: any) => {
        if (each.id === this.state.renameFileId) each.name = result.payload.name
      })
      this.setState({ showModal: false, modalView: 'modalView', table, showToaster: true })
    } catch (error) {
      console.log('E: ', error)
    }
  }

  onRemoveDocument = async () => {
    let table = this.state.table
    try {
      let result = await this.props.removeFolder({ folderId: this.state.isSelected })
      table = table.filter((x: any) => x.id !== result.payload.folderId)
      this.setState({ showToaster: false, table })
    } catch (error) {
      console.log('E: ', error)
    }
  }

  changeHandler = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  downloadFile = async () => {
    let uuid = this.props.item.uuid
    let result = await this.props.generateDownloadLink(uuid)
    setTimeout(() => {
      if (result && this.props.downloadToken && this.props.downloadToken.length > 0)
        window.location.href = `http://cdn.persiangig.com/dl/${this.props.downloadToken}/${this.props.item.uuid}/${this.props.item.name}`
    }, 1000)
  }

  // rename modal
  openRenameModal = (renameFileId: number) => {
    let renameInput = this.state.table.filter((obj: any) => {
      return obj.id === renameFileId
    })[0].name
    this.setState({ modalView: 'renameFile', showModal: true, renameInput, renameFileId })
  }
  openShareModal = (id: number) => {
    let shareInput = this.state.table.filter((obj: any) => {
      return obj.id === id
    })[0].uuid
    this.setState({ modalView: 'shareFile', showModal: true, shareInput })
  }

  handleClose = () => {
    if (this.props.history.location.pathname.includes('preview')) this.props.history.push('/fm')
    this.setState({ showModal: false, renameFileId: '', modalView: '' })
  }

  // remove modal
  openRemoveModal = (isSelected: number) => {
    this.setState({ showToaster: true, isSelected, modalView: 'removeFile', countDown: this.countDownTime / 1000 })
    this.timer = setTimeout(() => {
      this.onRemoveDocument()
      this.setState({ showToaster: false, modalView: '' })
      this.timer = 0
    }, this.countDownTime)
  }

  onCancle = () => {
    this.setState({ showToaster: false, modalView: '' })
    if (this.timer) {
      clearTimeout(this.timer)
    }
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

  // on item check
  onCheck = (id: number, e: any) => {
    let { selectedArray } = this.state
    console.log(id)
    console.log(selectedArray)
    if (selectedArray.indexOf(id) === -1) selectedArray.push(id)
    else
      selectedArray = selectedArray.filter(function(obj) {
        return obj !== id
      })
    console.log(selectedArray)
    this.props.setSelections(selectedArray)
    this.setState({ selectedArray })
  }

  goNext = (add: number) => {
    console.log(this.props.item.id)
    let index = this.props.document.documents.findIndex((p: any) => p.id == this.props.item.id)
    let firstFileIndex = this.props.document.documents.findIndex((a: any) => a.discriminator === 'F')
    if (this.props.document.documents[index].discriminator === 'F') {
      let item = this.props.document.documents[+index + add]
      if (+index + add > this.props.document.documents.length - 1) {
        let index = firstFileIndex
        item = this.props.document.documents[index]
      }

      if (+index + add < firstFileIndex) {
        let reversed = this.props.document.documents.filter((item: any) => {
          return item.discriminator === 'F'
        })
        item = reversed[reversed.length - 1]
      }
      if (item) {
        console.log(item.genericType)
        this.props.history.push(`/fm/preview/${item.genericType}${item.genericType === 'image' ? '/' + this.props.image : ''}/${name}`)
        this.props.setItem(item)
        this.setState({ modalView: 'previewModal', previewId: item.id, fileName: name, [`item${item.id}`]: item })
      }
    }
    console.log(index)
    // this.props.history.push(`fm/preview/${item.genericType}${item.genericType === 'image' ? '/' + this.props.image : ''}/${name}`)
    // this.props.setItem(item)
    // console.log('hi')
    // this.setState({ modalView: 'previewModal', previewId: id, fileName: name, [`item${id}`]: item })
  }

  public render() {
    let dropDownData = [
      { label: t`دانلود فایل` },
      { label: t`تغییر نام`, onClick: this.openRenameModal },
      { label: t`اشتراک گذاری`, onClick: this.openShareModal },
      { label: t`افزودن توضیح` },
      { label: t`دریافت لینک‌ها` },
      { label: t`حذف فایل`, onClick: this.openRemoveModal }
    ]
    let modal, toaster, preview

    switch (this.state.modalView) {
      case 'renameFile':
        modal = (
          <UploadModal
            show={this.state.showModal}
            width={640}
            title={'تغییر نام'}
            formDescription={' نام جدید را در فرم زیر وارد نمایید'}
            handleClose={this.handleClose}
          >
            <RenameFile value={this.state.renameInput} changeHandler={this.changeHandler} handleSubmit={this.onRenameDocument} />
          </UploadModal>
        )
        break
      case 'shareFile':
        modal = <ShareModal handleCFClose={this.handleClose} showModal={true} />
        break
      // case 'removeFile':
      //   toaster = (
      //     <Toast level={'success'} caret={false}>
      //       <CountdownTimer startTimeInSeconds={this.state.countDown} />
      //       پوشه حذف شد
      //       <div className={styles.undo} onClick={this.onCancle}>
      //         انصراف
      //       </div>
      //     </Toast>
      //   )
      //   break
      // case 'renameDone':
      //   toaster = (
      //     <Toast level={'success'} caret={false}>
      //       نام تغییر یافت
      //     </Toast>
      //   )
      //   break
      case 'previewModal':
        let content
        switch (this.props.item.genericType) {
          case 'image':
            content = (
              <img
                className={'cover'}
                src={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`}
              />
            )
            break
          case 'video':
            content = <MyVideoPlayer url={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`} />
            break
          case 'audio':
            content = (
              <MyVideoPlayer
                url={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`}
                type={'audio'}
              />
            )
            break
          default:
            content = <Icon mimetype={this.props.item.genericType} style={{ width: 300 }} />
            break
        }
        preview = (
          <Preview
            show={true}
            type={'music'}
            item={this.state[`item${this.state.previewId}`]}
            handleClose={this.handleClose}
            goTo={this.goNext}
            onDownloadFile={this.downloadFile}
          >
            {content}
          </Preview>
        )
        break
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleClose} showModal={this.state.showModal} />
        break
    }

    // const history = [{ title: t`پوشه اصلی`, link: '/fm', active: false }]
    // if (this.props.location.pathname !== '/fm')
    //   history.push({ title: this.props.location.pathname.split('/fm/'), link: this.props.location.pathname.split['/'], active: true })

    return (
      <React.Fragment>
        <ContentHeader
          view={this.state.view}
          history={this.props.history}
          switchView={this.switchView}
          handleSearchInput={(e: any) => this.onChangeSearchInput(e)}
        />
        <ContentBody
          turnOffbutton={this.turnOffbutton}
          view={this.state.view}
          onOpenCFModal={this.onOpenCFModal}
          username={this.props.auth.username}
          width={this.state.width}
          table={this.state.filteredTable}
          dropDownData={dropDownData}
          optionSelected={this.state.optionSelected}
          onSelect={this.onSelect}
          onCheckAll={this.onCheckAll}
          onCheck={this.onCheck}
          loading={this.props.loading}
          loadingStyle={styles.loading}
          onSort={this.onSort}
          handleNavigate={this.handleNavigate}
          checkAll={this.state.checkAll}
        />
        {modal}
        {preview}
        {toaster}
        {!this.props.loading && this.state.filteredTable.length > 0 && (
          <div className={styles.footer}>
            <Button
              className={[this.state.showMore ? 'btnDefault0' : 'btnDefault100', 'btnLg']}
              disabled={!this.state.showMore}
              onClick={this.showMore}
            >
              <IconLink icon={arrowBottom} className={styles.arrow} iconAlt={`new-folder`} label={t`نمایش بیشتر`} />
            </Button>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  state: state,
  document: state.document,
  loading: state.loading.isLoading,
  auth: state.auth,
  item: state.sidebar.item,
  image: state.sidebar.image,
  selection: state.selection.selection,
  downloadToken: state.sidebar.downloadToken,
  fullScreen: state.selection.fullScreen
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    generateDownloadLink: (value: IGenerateLinkInput) => dispatch(generateDownloadLink(value)),
    createFolder: () => dispatch(createFolder()),
    renameFolder: (value: any) => dispatch(renameFolder(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    shareDocuments: () => dispatch(shareDocuments()),
    removeFolder: (value: any) => dispatch(removeFolder(value)),
    setSelections: (value: any) => dispatch(setSelections(value)),
    setItem: (value: any) => dispatch(setSidebarItems(value)),
    removeSelection: () => dispatch(removeSelection()),
    getTrashDocuments: () => dispatch(getTrashDocuments()),
    setToggle: (value: any) => dispatch(setToggle(value)),
    getSharedDocuments: () => dispatch(getSharedDocuments()),
    setParentId: (value: any) => dispatch(setParentId(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
