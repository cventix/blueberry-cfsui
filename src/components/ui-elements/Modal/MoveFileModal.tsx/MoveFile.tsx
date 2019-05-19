import React from 'react'
import { connect } from 'react-redux'

import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { moveDocuments, getModalDocuments } from '../../../../services/internal/store/actions/documents'
import { ContentBody } from '../../../Content/ContentBody'

import styles from './MoveFile.module.scss'
import { Button } from '../../Button/Button'
import { navigateObject } from '../../../Content/Content'
import { Breadcrumb } from '../../Breadcrumb/Breadcrumb'
import { t } from 'ttag/types'

export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  createFolder?: any
  document?: any
  getModalDocuments?: any
  modalDocs?: any
}
class MoveFile extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
    this
  }
  state = {
    name: '',
    description: '',
    showToast: false,
    message: '',
    fileId: '',
    table: [],
    history: []
  }
  componentDidMount() {
    this.setState({ table: this.props.document.documents, history: [{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }] })
  }
  onGetDocument = async (isChildren?: boolean, path?: any) => {
    if (isChildren == true) {
      try {
        await this.props.getModalDocuments({ isChildren: true, path, modal: true })
      } catch (error) {
        console.log('E: ', error)
      }
    } else {
      try {
        await this.props.getModalDocuments({ modal: true })
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
  }

  handleNavigate = ({ e, name, id }: navigateObject) => {
    let { history } = this.state
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.props.document.documents.filter((obj: any) => {
          let historyObj = { title: obj.name , link: '/', active: true, onClick: this.onGetDocument }
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.onGetDocument(true, name)
      }
    }
  }

  render() {
    const history = [{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }]

    console.log(this.props.modalDocs)
    const { showModal, handleClose } = this.props
    return (
      <UploadModal
        show={showModal}
        handleClose={handleClose}
        flexDirection={'column'}
        width={640}
        title={'انتقال'}
        formDescription={'پوشه مقصد را انتخاب کنید'}
      >
        <Breadcrumb history={this.state.history} modal={true} />
        <div className={styles.move}>
          <ContentBody
            view={'grid'}
            table={this.state.table}
            isMoveModal={true}
            dropdown={false}
            checkbox={false}
            hasHeader={false}
            handleNavigate={this.handleNavigate}
          />
        </div>
        <div className={styles.submitButton}>
          <Button className={[this.state.fileId ? 'btnPrimary100' : 'btnPrimaryOutline', 'btnSm']} style={{ marginLeft: 5 }} disabled={true}>
            انتقال
          </Button>
          <Button className={['btnDefault100', 'btnSm']} onClick={handleClose}>
            انصراف
          </Button>
        </div>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, loading: state.loading.isLoading, modalDocs: state })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getModalDocuments: (value: any) => dispatch(getModalDocuments(value)),
    moveDocuments: () => dispatch(moveDocuments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveFile)
