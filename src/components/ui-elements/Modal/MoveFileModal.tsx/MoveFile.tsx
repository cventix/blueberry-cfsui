import React from 'react'
import { connect } from 'react-redux'

import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { moveDocuments, getModalDocuments } from '../../../../services/internal/store/actions/documents'
import { ContentBody } from '../../../Content/ContentBody'

import styles from './MoveFile.module.scss'
import { Button } from '../../Button/Button'
import { navigateObject } from '../../../Content/Content'
import { Breadcrumb } from '../../Breadcrumb/Breadcrumb'
import { t } from 'ttag'
import { setHistory } from '../../../../services/internal/store/actions/history';

export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  createFolder?: any
  document?: any
  getModalDocuments?: any
  setHistory?:any
  modalDocs?: any
}
export interface Istate {
  name: string
  description: string
  showToast: boolean
  message: string
  fileId: number
  table: any
  history: any

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
      history: []
    }
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
    let history = this.state.history
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.props.document.documents.filter((obj: any) => {
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.onGetDocument(true, name)
        this.props.setHistory([{ title: `پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }])
        console.log(history)
        this.setState({ history })
      }
    }
  }

  render() {
    const history = [{ title: t`پوشه اصلی`, link: '/', active: false, onClick: this.onGetDocument }]

    console.log(this.props.modalDocs)
    const { showModal, handleClose } = this.props
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

const mapStateToProps = (state: any) => ({ document: state.document, loading: state.loading.isLoading, modalDocs: state })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getModalDocuments: (value: any) => dispatch(getModalDocuments(value)),
    moveDocuments: () => dispatch(moveDocuments()),
    setHistory: (value:any)=>dispatch(setHistory())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveFile)
