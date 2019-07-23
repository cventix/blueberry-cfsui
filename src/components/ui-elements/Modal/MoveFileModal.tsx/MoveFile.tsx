import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { ContentBody } from '../../../Content/ContentBody'
import { Button } from '../../Button/Button'
import { navigateObject } from '../../../Content/Content'
import { Breadcrumb } from '../../Breadcrumb/Breadcrumb'
import { Icon } from '../../Icon'

//styles and icons
import loadingIcon from '../../../../images/loading/tail-spin.svg'
import styles from './MoveFile.module.scss'

//services
import { moveDocuments, getModalDocuments, setParentId, setModalSelections, setHistory } from '../../../../services/internal/store/actions'
import { IGetDocumentsInput, IMoveDocumentsInput, DocumentsInterface } from '../../../../services/internal/repositories/documents'

export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  document?: any
  modalSelection?: number
  getModalDocuments: (getInput: IGetDocumentsInput) => void
  setHistory?: any
  loading?: boolean
  moveDocuments: (moveInput: IMoveDocumentsInput) => void
  selection?: Array<number>
  setModalSelections: any
  parentId?: number
  setParentId: (parentId: number) => void
}
export interface Istate {
  name: string
  description: string
  showToast: boolean
  message: string
  fileId: number
  table: any
  lastChild: boolean
  history: any
  id: any
}
class MoveFile extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      name: '',
      description: '',
      showToast: false,
      message: '',
      fileId: 0,
      table: [],
      history: [],
      lastChild: false,
      id: 0
    }
  }

  componentDidMount() {
    this.onGetDocument(false, '/')
    this.setState({ table: this.props.document.documents })
    this.props.setHistory([{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }])

    if (this.props.modalSelection !== 1) this.props.setModalSelections(1)
  }

  onGetDocument = async (isChildren?: boolean, path?: any, id?: number) => {
    //console.log(path)
    if (path !== '/') {
      try {
        if (id) this.props.setParentId(id)
        await this.props.getModalDocuments({ isChildren: true, path, modal: true, id })
      } catch (error) {
        //console.log('E: ', error)
      }
    } else {
      try {
        this.props.setParentId(0)
        await this.props.getModalDocuments({ modal: true, id })
      } catch (error) {
        //console.log('E: ', error)
      }
    }
    //console.log(path)
    this.setState({
      history: {
        title: name,
        link: path,
        active: false,
        onClick: this.onGetDocument,
        parent: true,
        id: id
      }
    })
  }
  /**
   * gets data and makes an obj
   * @param nextProps
   */
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.document.modal_documents.length > 0) this.setState({ table: nextProps.document.modal_documents })
    if (nextProps.document.lastChild) {
      if (this.props.modalSelection !== this.state.id) this.props.setModalSelections(this.state.id)
    }
  }

  handleNavigate = ({ e, name, id }: navigateObject) => {
    this.setState({ id })
    let history = this.state.history
    let parent = 1
    let path
    let item
    if (e.target.tagName != 'INPUT') {
      if (this.props.modalSelection !== id && id) this.props.setModalSelections(id)
      let discriminator = this.props.document.modal_documents.filter((obj: any) => {
        return obj.name == name
      })
      if (discriminator[0] || !this.state.lastChild) {
        if (discriminator[0].parent) parent = discriminator[0].parent.id
        path = discriminator[0].fullPath
        item = discriminator[0]
        discriminator = discriminator[0].discriminator
      }
      //console.log(item.parent)
      if (discriminator === 'D') {
        this.onGetDocument(true, path, id)
      }
    }
  }
  moveDocument = () => {
    if (this.state.id && this.props.selection) {
      this.props.moveDocuments({ targetId: this.state.id, documentIds: this.props.selection })
      this.props.handleClose()
    }
  }
  render() {
    const { showModal, handleClose, loading, modalSelection } = this.props
    let style = localStorage.getItem('__language') == 'en' ? { marginRight: 5 } : { marginLeft: 5 }
    return (
      <UploadModal
        show={showModal}
        handleClose={handleClose}
        flexDirection={'column'}
        width={640}
        title={t`انتقال`}
        formDescription={t`انتقال فایل به ...`}
      >
        <Breadcrumb history={this.state.history} modal={true} parentId={this.props.parentId} />
        <div className={[styles.move, modalSelection && styles.selected].join(' ')}>
          {!loading ? (
            <ContentBody
              view={'grid'}
              table={this.state.table}
              isMoveModal={true}
              dropdown={false}
              checkbox={false}
              hasHeader={false}
              handleNavigate={this.handleNavigate}
            />
          ) : (
            <div className={styles.loading}>
              {loading ? (
                <>
              <Icon src={loadingIcon} style={{ padding: '4px' }} /> {t`در حال بارگذاری`}
                </>
              ) : (
                'داده ای وجود ندارد'
              )}
            </div>
          )}
        </div>

        <div className={styles.submitButton}>
          <Button
            className={[!this.props.modalSelection ? 'pg-btnPrimaryOutline' : 'pg-btnPrimary100', 'pg-btnSm']}
            style={style}
            disabled={!this.props.modalSelection}
            onClick={this.moveDocument}
          >
            {t`انتقال`}
          </Button>
          <Button className={['pg-btnDefault100', 'pg-btnSm']} onClick={handleClose}>
            {t`انصراف`}
          </Button>
        </div>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({
  document: state.document,
  loading: state.loading.modalLoading,
  modalSelection: state.selection.modalSelect,
  selection: state.selection.selection,
  parentId: state.document.parentId
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getModalDocuments: (value: IGetDocumentsInput) => dispatch(getModalDocuments(value)),
    moveDocuments: (value: IMoveDocumentsInput) => dispatch(moveDocuments(value)),
    setHistory: (value: any) => dispatch(setHistory(value)),
    setModalSelections: (value: Array<number>) => dispatch(setModalSelections(value)),
    setParentId: (value: number) => dispatch(setParentId(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveFile)
