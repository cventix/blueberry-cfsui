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
import { getDocuments, createFolder, renameFolder, moveDocuments, shareDocuments } from '../../services/internal/store/actions'
import { formatDate } from '../../services/internal/utils/formatDates'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { Modal } from '../ui-elements/Modal/Modal'
import { RenameFile } from '../ui-elements/Modal/ModalContent/RenameFile'
import { UploadModal } from '../ui-elements/Uploadmodal/Uploadmodal'

const history = [{ title: 'پوشه اصلی', link: '/' }, { title: 'پوشه فرعی', link: '/' }, { title: 'پوشه تست', link: '/', active: true }]

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
  data?: any
  history?: any
}

export interface IState {
  table: any
  checkAll: boolean
  view: string
  width: number
  height: number
  optionSelected?: number
  ascending: string
  [key: string]: any
}

class Content extends React.Component<IProps, IState> {
  private _documents: DocumentsInterface
  constructor(props: any) {
    super(props)
    this.state = {
      table: '',
      checkAll: false,
      view: 'grid',
      width: 0,
      height: 0,
      modalView: 'renameFile',
      ascending: 'ascending',
      name: '',
      showRename: false,
      description: '',
      showToast: false,
      message: ''
    }
    this._documents = bottle.container.Documents
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  getDocument = async () => {
    try {
      let result = await this.props.getDocuments()
      this.setState({ table: this.props.data }, () => console.log(this.state.table))

      // this.setState({ table: result},()=>console.log(this.state.table))
    } catch (error) {
      console.log('E: ', error)
    }
  }
  async componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    try {
      let result = await this.props.getDocuments()
      this.setState({ table: this.props.data }, () => console.log(this.state.table))

      // this.setState({ table: result},()=>console.log(this.state.table))
    } catch (error) {
      console.log('E: ', error)
    }
  }

  componentWillReceiveProps(nextProps: any) {
    let table: any[] = []
    nextProps.document.documents.map((each: any) => {
      table.push({
        id: each.id,
        type: each.genericType,
        name: each.name,
        fullPath: each.fullPath,
        created_at: formatDate(each.createdAt),
        owner: each.owner.displayName,
        size: each.size ? formatBytes({ bytes: each.size, lang: 'fa' }) : '---'
      })
    })

    this.setState({
      table
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  onSort = (sortBy: string, type?: string) => {
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

  onRenameDocument = async (e: any) => {
    if (e) e.preventDefault()
    try {
      let result = await this.props.renameFolder({ folderId: this.state.renameFileId, name: this.state.renameInput })
      this.setState({ showRename: false })
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
    this.setState({ showRename: true, renameFileId })
  }

  closeRenameModalclose = () => {
    this.setState({ showRename: false, renameFileId: '' })
  }
  handleNavigate = (name: any, id: number) => {
    this.props.history.push(name)
    this.onGetDocument(name)
  }
  onGetDocument = async (path: any) => {
    try {
      let result = await this.props.getDocuments({ isChildren: true, path })
      // this.setState({ table: this.props.data }, () => console.log(this.state.table))

      // this.setState({ table: result},()=>console.log(this.state.table))
    } catch (error) {
      console.log('E: ', error)
    }
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
  componentWillMount() {
    console.log(this.props.history)
  }
  public render() {
    let dropDownData = [
      { label: ' دانلود فایل' },
      { label: 'تغییر نام', onClick: this.openRenameModal },
      { label: 'اشتراک گذاری' },
      { label: 'افزودن توضیح' },
      { label: 'دریافت لینک‌ها' },
      { label: 'حذف فایل' }
    ]
    let modal
    switch (this.state.modalView) {
      case 'renameFile':
        modal = <RenameFile changeHandler={this.changeHandler} handleSubmit={this.onRenameDocument} />
        break
    }
    console.log(this.props.history)
    if (this.state.width < 768) {
      return (
        <React.Fragment>
          <Breadcrumb history={history} />
          <Table
            dropdown={true}
            handleNavigate={this.handleNavigate}
            dropDownData={dropDownData}
            tabletView={true}
            onCheckAll={this.onCheckAll}
            checkAll={this.state.checkAll}
            onSort={this.onSort}
            table={this.state.table}
            onRenameDocument={this.onRenameDocument}
          />
          <Modal show={true}>{modal}</Modal>
        </React.Fragment>
      )
    } else
      return (
        <React.Fragment>
          <Contentheader view={this.state.view} switchView={this.switchView} />
          {this.state.view === 'table' ? (
            <div>
              <GridHeader onCheckAll={this.onCheckAll} checkAll={this.state.checkAll} sortable={true} onSort={this.onSort} />
              <Grid
                dropDownData={dropDownData}
                checkbox={true}
                handleNavigate={this.handleNavigate}
                onCheckAll={this.onCheckAll}
                checkAll={this.state.checkAll}
                table={this.state.table}
              />
            </div>
          ) : (
            <React.Fragment>
              <Table
                dropdown={true}
                dropDownData={dropDownData}
                optionSelected={this.state.optionSelected}
                onSelect={this.onSelect}
                onCheckAll={this.onCheckAll}
                handleNavigate={this.handleNavigate}
                checkAll={this.state.checkAll}
                onSort={this.onSort}
                table={this.state.table}
                onRenameDocument={this.onRenameDocument}
              />
              <div className={styles.footer}>
                <Button className={['btnDefault0', 'btnLg']} onClick={this.props.createFolder}>
                  <IconLink icon={arrowBottom} className={styles.arrow} iconAlt={`new-folder`} label="نمایش بیشتر" />
                </Button>
              </div>
            </React.Fragment>
          )}
          <UploadModal
            show={this.state.showRename}
            width={640}
            title={'تغییر نام'}
            formDescription={' نام جدید را در فرم زیر وارد نمایید'}
            handleClose={this.closeRenameModalclose}
          >
            {modal}
          </UploadModal>
        </React.Fragment>
      )
  }
}
const mapStateToProps = (state: IState) => ({ document: state.document })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    createFolder: () => dispatch(createFolder()),
    renameFolder: (value: any) => dispatch(renameFolder(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    shareDocuments: () => dispatch(shareDocuments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
