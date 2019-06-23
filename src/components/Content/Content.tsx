import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// components
import { Button } from '../ui-elements/Button/Button'
import { IconLink } from '../ui-elements/IconLink'
import { ContentHeader } from './ContentHeader'
import ContentBody from './ContentBody'

// Services
import { getDocuments, setSidebarItems, getTrashDocuments, getSharedDocuments, setParentId } from '../../services/internal/store/actions'
import { sliceData } from '../../services/internal/utils/sliceData'
import { setSelections, removeSelection, setToggle, selectAll } from '../../services/internal/store/actions/selections'
import { IGenerateLinkInput, IRenameFolderInput, IRemoveFolderInput } from '../../services/internal/repositories/documents'
import { sortData } from '../../services/internal/utils/sortData'

// styles & icons
import arrowBottom from '../../images/buttonIcons/icon-btn-arrow-bottom.svg'
import styles from './Content.module.scss'

import ModalContent from './SubContent/ModalContent'
import { ItemInterface } from '../../services/internal/store/reducers/documentReducer'

export interface IProps {
  getDocuments?: any
  data?: any
  history?: any
  location?: any
  item: ItemInterface
  document?: any
  loading?: boolean
  setSelections: (e: Array<number>) => void
  setItem: (e: any) => void
  selection: Array<number>
  image?: string
  removeSelection?: any
  getSharedDocuments?: any
  getTrashDocuments?: any
  setToggle?: any
  setParentId?: any
  selectAll?: any
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

  constructor(props: any) {
    super(props)
    this.state = {
      table: [],
      filteredTable: [],
      checkAll: false,
      selectedArray: [],
      view: 'grid',
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
    if (this.props.location.pathname === '/fm' || this.props.location.pathname === '/fm/' || this.props.location.pathname.includes('preview')) {
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

  turnOffbutton = () => {
    if (this.state.showMore !== false) this.setState({ showMore: false })
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
    console.log(nextProps)
    if (nextProps.selection.length == 0 || (nextProps.selection.length > 0 && nextProps.document.documents !== this.state.mainTable)) {
      console.log(sliceData({ array: nextProps.document.documents }))
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
      table: sliceData({ array: table }),
      mainTable: table,
      filteredTable: this.state.table
    })
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
      { label: t`اشتراک گذاری`, onClick: this.openModal },
      { label: t`افزودن توضیح` },
      { label: t`دریافت لینک‌ها` },
      { label: t`حذف فایل`, onClick: this.openModal }
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
          turnOffbutton={this.turnOffbutton}
          onCheckAll={this.onCheckAll}
          onCheck={this.onCheck}
          view={this.state.view}
          onOpenCFModal={this.onOpenCFModal}
          table={this.state.filteredTable}
          dropDownData={dropDownData}
          loading={this.props.loading}
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

    selectAll: (value: boolean) => dispatch(selectAll(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)
