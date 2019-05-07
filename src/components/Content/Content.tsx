import React from 'react'
import { connect } from 'react-redux'
import { Table } from '../Table/Table'
import { Grid } from '../Grid/Grid'
import { GridHeader } from '../Grid/GridHeader'
import { Contentheader } from './Contentheader'
import { Breadcrumb } from '../ui-elements/Breadcrumb/Breadcrumb'
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import { DocumentsInterface } from '../../services/internal/repositories/documents'

import styles from './Content.module.scss'

// Services
import { bottle } from '../../services'
import { getDocuments, createFolder, renameFolder, removeFolder, moveDocuments, shareDocuments } from '../../services/internal/store/actions'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { Modal } from '../ui-elements/Modal/Modal'
import { RenameFile } from '../ui-elements/Modal/ModalContent/RenameFile'
import { UploadModal } from '../ui-elements/Uploadmodal/Uploadmodal'

import { withRouter } from 'react-router'
import { Icon } from '../ui-elements/Icon'
import loading from '../../images/loading/tail-spin.2.svg'
import { ConfirmModal } from '../ui-elements/Modal/ModalContent/ConfirmModal'
import { any } from 'prop-types'
import { Toast } from '../ui-elements/Toast/Toast'

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
  constructor(props: any) {
    super(props)
    this.state = {
      table: '',
      checkAll: false,
      selectedArray: [],
      view: 'grid',
      width: 0,
      height: 0,
      showMore: false,
      modalView: 'renameFile',
      ascending: 'ascending',
      name: '',
      showRename: false,
      description: '',
      showToast: false,
      message: ''
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  async componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    if (this.props.location.pathname === '/') {
      this.onGetDocument(false)
      this.setState({ table: this.props.data })
    } else {
      this.onGetDocument(true, this.props.location.pathname)
    }
  }

  /**back button */
  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.location.pathname !== prevProps.location.pathname && this.props.location.pathname === '/') {
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
    let table: any[] = []
    nextProps.document.documents.map((each: any) => {
      table.push({
        id: each.id,
        type: each.genericType,
        name: each.name,
        discriminator: each.discriminator,
        fullPath: each.fullPath,
        created_at: formatDate(each.createdAt),
        owner: each.owner.displayName,
        size: each.size ? formatBytes({ bytes: each.size, lang: 'fa' }) : '---'
      })
    })
    this.setState({
      table: this.sliceData({ array: table }),
      showMore: true,
      mainTable: table
    })
  }
  /**slice data for show more */
  sliceData = ({ array, choppedArray = [], step = this.step }: { array: any; choppedArray?: any; step?: number }) => {
    console.log(array)
    let number = choppedArray.length / step + 1
    return array.slice(0, number * step)
  }

  //show more button function
  showMore = () => {
    this.setState({
      table: this.sliceData({ array: this.state.mainTable, choppedArray: this.state.table }),
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
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  // onSort = (sortBy: string, type?: string) => {
  //   let table = this.state.table
  //   switch (type) {
  //     case 'alphabet':
  //       table &&
  //         table.sort((a: any, b: any) => {
  //           if (a[sortBy] < b[sortBy]) {
  //             return -1
  //           }
  //           if (a[sortBy] > b[sortBy]) {
  //             return 1
  //           }
  //           return 0
  //         })
  //       break
  //     default:
  //       table &&
  //         table.sort((a: any, b: any) => {
  //           if (this.state[sortBy] !== 'ascending') {
  //             this.setState({ [sortBy]: 'ascending' })
  //             return a[sortBy] - b[sortBy]
  //           } else {
  //             this.setState({ [sortBy]: 'decending' })
  //             return b[sortBy] - a[sortBy]
  //           }
  //         })
  //   }

  //   this.setState({ table })
  // }

  onCheckAll = () => {
    this.setState({ checkAll: !this.state.checkAll })
  }

  switchView = (view: string) => {
    this.setState({ view })
  }

  onSelect = (optionSelected: number) => {
    this.setState({ optionSelected })
  }

  onRenameDocument = async (e: any) => {
    if (e) e.preventDefault()
    try {
      let result = await this.props.renameFolder({ folderId: this.state.renameFileId, name: this.state.renameInput })
      this.setState({ showRename: false })
    } catch (error) {
      console.log('E: ', error)
    }
  }

  onRemoveDocument = async (e: any) => {
    if (e) e.preventDefault()
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

  openRenameModal = (renameFileId: number) => {
    let renameInput = this.state.table.filter((obj: any) => {
      return obj.id === renameFileId
    })[0].name
    this.setState({ showRename: true, renameInput, renameFileId })
  }

  openRemoveModal = (isSelected: number) => {
    console.log(isSelected)
    this.setState({ showRemove: true, isSelected, modalView: 'removeFile' })
  }

  closeRenameModalclose = () => {
    this.setState({ showRename: false, renameFileId: '' })
  }

  handleNavigate = (e: any, name: string, id: number) => {
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.state.table.filter((obj: any) => {
        console.log(obj.name == name)
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.props.history.push(name)
        this.onGetDocument(true, name)
      }
    }
  }

  stopPropagation = (e: any) => {
    console.log(e)
    e.stopPropagation()
  }

  onCheck = (id: number) => {
    let { selectedArray } = this.state
    if (selectedArray.indexOf(id) === -1) selectedArray.push(id)
    else
      selectedArray = selectedArray.filter(function(obj) {
        return obj !== id
      })
    this.setState({ selectedArray }, () => console.log(selectedArray))
  }

  // showToast() {
  //   this.setState(
  //     {
  //       showToast: true,
  //       message: 'پوشه ایجاد شد'
  //     },
  //     () => {
  //       setTimeout(() => this.setState({ showToast: false }), 3000)
  //     }
  //   )
  // }

  public render() {
    console.log(this.state.timer)
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
        modal = <RenameFile value={this.state.renameInput} changeHandler={this.changeHandler} handleSubmit={this.onRenameDocument} />
        break
      case 'removeFile':
        toaster = (
          <Toast level={'success'} caret={false}>
            {this.state.timer}
            پوشه حذف شد
          </Toast>
        )
        break
    }
    const history = [{ title: 'پوشه اصلی', link: '/', active: false }]
    if (this.props.location.pathname !== '/')
      history.push({ title: this.props.location.pathname.split('/'), link: this.props.location.pathname, active: true })

    return !this.props.loading && this.state.table.length > 0 ? (
      <React.Fragment>
        <Contentheader view={this.state.view} history={history} switchView={this.switchView} />
        {this.state.view === 'table' && this.state.width < 768 ? (
          <Grid
            sortable={true}
            dropDownData={dropDownData}
            checkbox={true}
            handleNavigate={this.handleNavigate}
            onCheckAll={this.onCheckAll}
            checkAll={this.state.checkAll}
            table={this.state.table}
          />
        ) : (
          <Table
            dropdown={true}
            tabletView={this.state.width < 768 ? true : false}
            dropDownData={dropDownData}
            optionSelected={this.state.optionSelected}
            onSelect={this.onSelect}
            onCheckAll={this.onCheckAll}
            stopPropagation={this.stopPropagation}
            onCheck={this.onCheck}
            handleNavigate={this.handleNavigate}
            checkAll={this.state.checkAll}
            table={this.state.table}
          />
        )}

        {/* <UploadModal
          show={this.state.showRename || this.state.showRemove}
          width={640}
          title={'تغییر نام'}
          formDescription={' نام جدید را در فرم زیر وارد نمایید'}
          handleClose={this.closeRenameModalclose}
        >
          {modal}
        </UploadModal> */}
        {toaster}
        <div className={styles.footer}>
          <Button
            className={[this.state.showMore ? 'btnDefault0' : 'btnDefault100', 'btnLg']}
            disabled={!this.state.showMore}
            onClick={this.showMore}
          >
            <IconLink icon={arrowBottom} className={styles.arrow} iconAlt={`new-folder`} label="نمایش بیشتر" />
          </Button>
        </div>
      </React.Fragment>
    ) : (
      <div className={styles.loading}>{this.props.loading ? <Icon src={loading} /> : 'داده ای وجود ندارد'}</div>
    )
  }
}
const mapStateToProps = (state: IState) => ({ document: state.document, loading: state.loading.isLoading })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    createFolder: () => dispatch(createFolder()),
    renameFolder: (value: any) => dispatch(renameFolder(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    shareDocuments: () => dispatch(shareDocuments()),
    removeFolder: (value: any) => dispatch(removeFolder(value))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Content) as any)
