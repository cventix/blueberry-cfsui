import React from 'react'
import { connect } from 'react-redux'
import ContentBody from '../ContentBody'
import { Modal } from '../../ui-elements/Modal/Modal'
import { t } from 'ttag'
import RenameFile from '../../ui-elements/Modal/ModalContent/RenameFile'
import ShareModal from '../../ui-elements/Modal/ShareModal.tsx/ShareModal'
import PreviewContent from './PreviewContent'
import CFModal from '../../ui-elements/Modal/CreateFolderModal/CreateFolder'
import { ToastUndo } from '../../ui-elements/Toast/ToastUndo/ToastUndo'
import toast from '../../../components/ui-elements/Toast/Toast'
import { setDocuments, removeFolder } from '../../../services/internal/store/actions'
import { IRemoveFolderInput } from '../../../services/internal/repositories/documents'

class ModalContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      showModal: true,
      toRemove: []
    }
  }
  handleClose = () => {
    if (this.props.history.location.pathname.includes('preview')) this.props.history.push('/fm')
    this.props.closeModal()
  }

  // remove modal
  openRemoveModal = (isSelected: number) => {
    console.log(isSelected)
    this.setState({
      toRemove: [...this.state.toRemove, isSelected]
    })
    let documents = this.props.document.documents.filter((i: any) => i.id !== isSelected)
    this.props.setDocuments(documents)
    toast.success(<ToastUndo undo={this.undo} id={isSelected} />, {
      onClose: this.cleanCollection
    })
  }
  undo = (id: any) => {
    this.setState({
      toRemove: this.state.toRemove.filter((v: any) => v !== id)
    })
  }

  cleanCollection = () => {
    this.onRemoveDocument()
    this.setState({
      toRemove: []
    })
  }

  onRemoveDocument = async () => {
    let table = this.props.table
    if (this.state.toRemove.length > 0)
      try {
        let result = await this.props.removeFolder({ folderId: this.state.toRemove })
        table = table.filter((x: any) => x.id !== result.payload.folderId)
        this.props.updateTable({ table })
      } catch (error) {
        console.log('E: ', error)
      }
  }
  componentDidMount() {
    if (this.props.modalView == t`حذف فایل`) {
      this.openRemoveModal(this.props.item.id)
    }
  }

  public render() {
    let modal

    console.log(this.props.modalView)
    switch (this.props.modalView) {
      case t`تغییر نام`:
        modal = <RenameFile handleClose={this.handleClose} showModal={true} table={this.props.table} updateTable={this.props.updateTable} />
        break
      case t`اشتراک گذاری`:
        modal = <ShareModal handleCFClose={this.handleClose} showModal={true} />
        break
      case 'createFolder':
        modal = <CFModal handleCFClose={this.handleClose} showModal={true} />
        break
      case 'previewModal':
        modal = <PreviewContent handleClose={this.handleClose} showModal={true} history={this.props.history} />
        break
      default:
        modal = <></>
    }
    return modal
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, item: state.sidebar.item })

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDocuments: (value: any) => dispatch(setDocuments(value)),
    removeFolder: (value: IRemoveFolderInput) => dispatch(removeFolder(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContent)
