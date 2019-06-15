import React from 'react'
import { connect } from 'react-redux'

import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { moveDocuments, getModalDocuments, setParentId } from '../../../../services/internal/store/actions/documents'
import { ContentBody } from '../../../Content/ContentBody'

import styles from './MoveFile.module.scss'
import { Button } from '../../Button/Button'
import { navigateObject } from '../../../Content/Content'
import { Breadcrumb } from '../../Breadcrumb/Breadcrumb'
import { t } from 'ttag'
import { setHistory } from '../../../../services/internal/store/actions/history'
import { setModalSelections } from '../../../../services/internal/store/actions/selections'
import { Icon } from '../../Icon'
import loadingIcon from '../../../../images/loading/tail-spin.2.svg'
export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  createFolder?: any
  document?: any
  modalSelection?: any
  getModalDocuments?: any
  setHistory?: any
  moveDocuments?: any
  selection?: any
  setModalSelections?: any
  modalDocs?: any
  loading?: boolean
  parentId?: number
  setParentId?: any
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
    this.onGetDocument(false)
    this.setState({ table: this.props.document.documents, history: [{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }] })
    this.props.setHistory([{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }])

    if (this.props.modalSelection !== 1) this.props.setModalSelections(1)
  }
  onGetDocument = async (isChildren?: boolean, path?: any, id?: number) => {
    if (isChildren == true) {
      try {
        this.props.setParentId(id)
        await this.props.getModalDocuments({ isChildren: true, path, modal: true, id })
      } catch (error) {
        console.log('E: ', error)
      }
    } else {
      try {
        this.props.setParentId(1)
        await this.props.getModalDocuments({ modal: true, id })
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
    if (e.target.tagName != 'INPUT') {
      if (this.props.modalSelection !== id) this.props.setModalSelections(id)
      let discriminator = this.props.document.modal_documents.filter((obj: any) => {
        return obj.name == name
      })
      if (discriminator[0] || !this.state.lastChild) {
        if (discriminator[0].parent) parent = discriminator[0].parent.id
        path = discriminator[0].fullPath
        discriminator = discriminator[0].discriminator
      }
      console.log(discriminator)
      if (discriminator === 'D') {
        this.onGetDocument(true, path, id)
        if (parent == 1){
          this.setState({
            history: [
              this.state.history[0],
              {
                title: name,
                link: path,
                active: false,
                onClick: this.onGetDocument,
                parent: true,
                id: id
              }
            ]
          })
        }
        // this.props.setHistory(this.state.history.push({ title: name, active: true, onClick: this.onGetDocument }))
        // console.log(history)
        // this.setState({ history })
      }
    }
  }
  moveDocument = () => {
    if (this.state.id) {
      this.props.moveDocuments({ targetId: this.state.id, documentIds: this.props.selection })
      this.props.handleClose()
    }
  }
  render() {
    const history = [{ title: t`پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }]

    console.log(this.props.modalSelection.length > 0 && this.props.modalSelection)
    const { showModal, handleClose, loading, modalSelection } = this.props
    return (
      <UploadModal
        show={showModal}
        handleClose={handleClose}
        flexDirection={'column'}
        width={640}
        title={t`انتقال`}
        formDescription={t`پوشه مقصد را انتخاب کنید`}
      >
        <Breadcrumb history={this.state.history} modal={true} />
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
                  <Icon src={loadingIcon} /> در حال بارگذاری{' '}
                </>
              ) : (
                'داده ای وجود ندارد'
              )}
            </div>
          )}
        </div>

        <div className={styles.submitButton}>
          <Button
            className={[
              !this.props.modalSelection || this.props.modalSelection.length == 0 || this.props.modalSelection == this.props.parentId
                ? 'btnPrimaryOutline'
                : 'btnPrimary100',
              'btnSm'
            ]}
            style={{ marginLeft: 5 }}
            disabled={!this.props.modalSelection || this.props.modalSelection.length == 0 || this.props.modalSelection == this.props.parentId}
            onClick={this.moveDocument}
          >
            {t`انتقال`}
          </Button>
          <Button className={['btnDefault100', 'btnSm']} onClick={handleClose}>
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
  modalDocs: state,
  modalSelection: state.selection.modalSelect,
  selection: state.selection.selection,
  parentId: state.document.parentId
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getModalDocuments: (value: any) => dispatch(getModalDocuments(value)),
    moveDocuments: (value: any) => dispatch(moveDocuments(value)),
    setHistory: (value: any) => dispatch(setHistory(value)),
    setModalSelections: (value: any) => dispatch(setModalSelections(value)),
    setParentId: (value: any) => dispatch(setParentId(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveFile)
