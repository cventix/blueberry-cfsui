import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { t } from 'ttag'

// components
import { Table } from '../Table/Table'
import { Grid } from '../Grid/Grid'
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import { UploadModal } from '../ui-elements/Uploadmodal/Uploadmodal'
import { RenameFile } from '../ui-elements/Modal/ModalContent/RenameFile'
import { Icon } from '../ui-elements/Icon'
import { CountdownTimer } from '../ui-elements/CountdownTimer/CountdownTimer'
import Toast from '../ui-elements/Toast/Toast'
import { ContentHeader } from './ContentHeader'
import { ContentBody } from './ContentBody'
import CFModal from '../ui-elements/Modal/CreateFolderModal/CreateFolder'
import Config from '../../services/internal/config/config'

// Services
import { bottle } from '../../services'
import {
  getDocuments,
  createFolder,
  renameFolder,
  removeFolder,
  moveDocuments,
  shareDocuments,
  setSidebarItems
} from '../../services/internal/store/actions'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { sliceData } from '../../services/internal/utils/sliceData'
import { setSelections } from '../../services/internal/store/actions/selections'

// styles & icons
import loading from '../../images/loading/tail-spin.2.svg'
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import styles from './Content.module.scss'
import { Preview } from '../ui-elements/Preview/Preview'
import image from '../../images/image.jpg'
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
  image?: any
}

export interface navigateObject {
  e: any
  name?: string
  id?: any
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
  ascending: string
  showMore: boolean
  selectedArray: number[]
  [key: string]: any
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
      ascending: 'ascending',
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
    console.log(this.props.location.pathname)
    if (this.props.location.pathname === '/fm') {
      this.onGetDocument(false)
      this.setState({ table: this.props.data })
    } else {
      console.log('jo')
      this.onGetDocument(true, this.props.location.pathname.split('/fm/')[1])
    }
    console.log(this.state.table)
    this.setState({ showMore: this.state.table.length > 10 ? true : false })
  }

  /**back button */
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.location.pathname === '/fm') {
      this.onGetDocument(false)
    }
  }

  /**
   * gets documnet if children goes inside folder
   */
  onGetDocument = async (isChildren?: boolean, path?: any) => {
    if (isChildren == true) {
      try {
        await this.props.getDocuments({ isChildren: true, path })
      } catch (error) {
        console.log('E: ', error)
      }
    } else {
      try {
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
    console.log('hi')
    if (nextProps.item) {
      console.log('ee')
      this.setState({
        item: nextProps.item
      })
    }
    console.log(nextProps.selection.length > 0)
    console.log(this.state.mainTable)
    console.log('hi 2')
    if (nextProps.selection.length == 0 || (nextProps.selection.length > 0 && nextProps.document.documents !== this.state.mainTable)) {
      console.log('inside props')
      this.setState({
        table: sliceData({ array: nextProps.document.documents }),
        showMore: true,
        mainTable: nextProps.document.documents,
        filteredTable: this.state.table
      })
    }
    if (nextProps.document.document < 10) this.setState({ showMore: false })
  }

  // show more button function
  showMore = () => {
    console.log(sliceData({ array: this.state.mainTable, choppedArray: this.state.table }))
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
    console.log('unmount')
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onSort = (sortBy: string, type?: string) => {
    console.log(type)
    console.log(this.state.table)
    let table = this.state.table
    switch (type) {
      case 'alphabet':
        table &&
          table.sort((a: any, b: any) => {
            if (a[sortBy] < b[sortBy]) {
              return -1
            }
            if (a[sortBy] > b[sortBy]) {
              return 1
            }
            return 0
          })
        break
      default:
        table.sort((a: any, b: any) => {
          if (a.size) return b.size - a.size
        })
    }
    console.log('table2')
    console.log(table)
    this.setState({ table })
  }

  onCheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll })
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
        this.onGetDocument(true, name)
      } else {
        console.log(item)
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

  // rename modal
  openRenameModal = (renameFileId: number) => {
    let renameInput = this.state.table.filter((obj: any) => {
      return obj.id === renameFileId
    })[0].name
    this.setState({ modalView: 'renameFile', showModal: true, renameInput, renameFileId })
  }

  handleClose = () => {
    if (this.props.history.location.pathname.includes('preview')) this.props.history.goBack()
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
  onCheck = (id: any) => {
    let { selectedArray } = this.state

    if (selectedArray.indexOf(id) === -1) selectedArray.push({'id':id})
    else
      selectedArray = selectedArray.filter(function(obj) {
        return obj !== id
      })
    console.log(selectedArray)
    this.props.setSelections(selectedArray)
    this.setState({ selectedArray }, () => console.log(selectedArray))
  }

  public render() {
    let dropDownData = [
      { label: t`دانلود فایل` },
      { label: t`تغییر نام`, onClick: this.openRenameModal },
      { label: t`اشتراک گذاری` },
      { label: t`افزودن توضیح` },
      { label: t`دریافت لینک‌ها` },
      { label: t`حذف فایل`, onClick: this.openRemoveModal }
    ]
    let modal, toaster, preview

    console.log(this.state.table)
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
      case 'removeFile':
        toaster = (
          <Toast level={'success'} caret={false}>
            <CountdownTimer startTimeInSeconds={this.state.countDown} />
            پوشه حذف شد
            <div className={styles.undo} onClick={this.onCancle}>
              انصراف
            </div>
          </Toast>
        )
        break
      case 'renameDone':
        toaster = (
          <Toast level={'success'} caret={false}>
            نام تغییر یافت
          </Toast>
        )
        break
      case 'previewModal':
        console.log(Config)
        preview = (
          <Preview show={true} type={'music'} item={this.state[`item${this.state.previewId}`]} handleClose={this.handleClose}>
            {this.props.item.genericType === 'image' ? (
              <img src={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`} />
            ) : (
              this.props.item.genericType && <Icon mimetype={this.props.item.genericType} style={{ width: 300 }} />
            )}
          </Preview>
        )
        break
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleClose} showModal={this.state.showModal} />
        break
    }
    const history = [{ title: t`پوشه اصلی`, link: '/fm', active: false }]
    if (this.props.location.pathname !== '/fm')
      history.push({ title: this.props.location.pathname.split('/fm/'), link: this.props.location.pathname.split['/'], active: true })

    return !this.props.loading && this.state.table && this.state.table.length > 0 ? (
      <React.Fragment>
        <ContentHeader
          view={this.state.view}
          history={history}
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
          onSort={this.onSort}
          handleNavigate={this.handleNavigate}
          checkAll={this.state.checkAll}
        />
        {modal}
        {preview}
        {toaster}
        <div className={styles.footer}>
          <Button
            className={[this.state.showMore ? 'btnDefault0' : 'btnDefault100', 'btnLg']}
            disabled={!this.state.showMore}
            onClick={this.showMore}
          >
            <IconLink icon={arrowBottom} className={styles.arrow} iconAlt={`new-folder`} label={t`نمایش بیشتر`} />
          </Button>
        </div>
      </React.Fragment>
    ) : (
      <div className={styles.loading}>{this.props.loading ? <Icon src={loading} /> : 'داده ای وجود ندارد'}</div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  document: state.document,
  loading: state.loading.isLoading,
  auth: state.auth,
  item: state.sidebar.item,
  image: state.sidebar.image,
  selection: state.selection.selection
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    createFolder: () => dispatch(createFolder()),
    renameFolder: (value: any) => dispatch(renameFolder(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    shareDocuments: () => dispatch(shareDocuments()),
    removeFolder: (value: any) => dispatch(removeFolder(value)),
    setSelections: (value: any) => dispatch(setSelections(value)),
    setItem: (value: any) => dispatch(setSidebarItems(value))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Content) as any)
