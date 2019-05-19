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

// Services
import { bottle } from '../../services'
import { getDocuments, createFolder, renameFolder, removeFolder, moveDocuments, shareDocuments } from '../../services/internal/store/actions'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { sliceData } from '../../services/internal/utils/sliceData'
import { setSelections } from '../../services/internal/store/actions/selections'

// styles & icons
import loading from '../../images/loading/tail-spin.2.svg'
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import styles from './Content.module.scss'

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
  prevState?: any
  document?: any
  loading?: boolean
  auth?: any
  setSelections?: any
}

export interface navigateObject {
  e: any
  name?: string
  id?: number
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
  countDownTime = 100000
  constructor(props: any) {
    super(props)
    this.state = {
      table: '',
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
      showRename: false,
      showRemove: false,
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

  /**
   * gets data and makes an obj
   * @param nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    this.setState({
      table: sliceData({ array: nextProps.document.documents }),
      showMore: true,
      mainTable: nextProps.document.documents,
      filteredTable: this.state.table
    })
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
    console.log('hi')
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
        table &&
          table.sort((a: any, b: any) => {
            if (this.state[sortBy] !== 'ascending') {
              this.setState({ [sortBy]: 'ascending' })
              return a[sortBy] - b[sortBy]
            } else {
              this.setState({ [sortBy]: 'decending' })
              return b[sortBy] - a[sortBy]
            }
          })
    }

    this.setState({ table })
  }

  onCheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll })
  }

  switchView = (view: string) => {
    this.setState({ view })
  }

  onSelect = (optionSelected: number) => {
    this.setState({ optionSelected })
  }

  handleNavigate = ({ e, name, id }: navigateObject) => {
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.state.table.filter((obj: any) => {
        console.log(obj.name == name)
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.props.history.push(`/fm/${name}`)
        this.onGetDocument(true, name)
      }
    }
  }

  onRenameDocument = async (e: any) => {
    if (e) e.preventDefault()
    try {
      let result = await this.props.renameFolder({ folderId: this.state.renameFileId, name: this.state.renameInput })
      this.setState({ showRename: false, modalView: 'doneRename' })
    } catch (error) {
      console.log('E: ', error)
    }
  }

  onRemoveDocument = async () => {
    try {
      let result = await this.props.removeFolder({ folderId: this.state.isSelected })
      this.setState({ showRemove: false })
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
    this.setState({ modalView: 'renameFile', showRename: true, renameInput, renameFileId })
  }

  closeRenameModalclose = () => {
    this.setState({ showRename: false, renameFileId: '' })
  }

  // remove modal
  openRemoveModal = (isSelected: number) => {
    this.setState({ showRemove: true, isSelected, modalView: 'removeFile', countDown: this.countDownTime / 1000 })
    this.timer = setTimeout(() => {
      // this.onRemoveDocument()
      this.setState({ showRemove: false, modalView: '' })
      this.timer = 0
    }, this.countDownTime)
  }

  onCancle = () => {
    this.setState({ showRemove: false, modalView: '' })
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
  onCheck = (id: number) => {
    let { selectedArray } = this.state

    if (selectedArray.indexOf(id) === -1) selectedArray.push(id)
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
      { label: ' دانلود فایل' },
      { label: 'تغییر نام', onClick: this.openRenameModal },
      { label: 'اشتراک گذاری' },
      { label: 'افزودن توضیح' },
      { label: 'دریافت لینک‌ها' },
      { label: 'حذف فایل', onClick: this.openRemoveModal }
    ]
    let modal, toaster
    switch (this.state.modalView) {
      case 'renameFile':
        modal = (
          <UploadModal
            show={this.state.showRename || this.state.showRemove}
            width={640}
            title={'تغییر نام'}
            formDescription={' نام جدید را در فرم زیر وارد نمایید'}
            handleClose={this.closeRenameModalclose}
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
    }
    const history = [{ title: t`پوشه اصلی`, link: '/', active: false }]
    if (this.props.location.pathname !== '/fm')
      history.push({ title: this.props.location.pathname.split('/fm'), link: this.props.location.pathname, active: true })
    console.log(this.state.table)
    return !this.props.loading && this.state.table.length > 0 ? (
      <React.Fragment>
        <ContentHeader
          view={this.state.view}
          history={history}
          switchView={this.switchView}
          handleSearchInput={(e: any) => this.onChangeSearchInput(e)}
        />
        <ContentBody
          view={this.state.view}
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

const mapStateToProps = (state: IState) => ({ document: state.document, loading: state.loading.isLoading, auth: state.auth })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    createFolder: () => dispatch(createFolder()),
    renameFolder: (value: any) => dispatch(renameFolder(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    shareDocuments: () => dispatch(shareDocuments()),
    removeFolder: (value: any) => dispatch(removeFolder(value)),
    setSelections: (value: any) => dispatch(setSelections(value))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Content) as any)
