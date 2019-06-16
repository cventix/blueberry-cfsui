import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolderModal/CreateFolder.module.scss'

//services
import { urlUpload } from '../../../../services/internal/store/actions/documents'
import { UploadModal } from '../Uploadmodal/Uploadmodal'

export interface Iprops {
  showModal?: boolean
  handleCFClose?: () => void
  createFolder?: any
  getDocuments?: () => void
  document?: any
  item?: any
  urlUpload?: any
  changeSharingStatus?: any
}

export interface Istate {
  name?: string
  description?: string
  message?: string
  userEmail?: string
  selected?: string
  shareLink?: string
  urlInput?: string
}

class UrlUploadModal extends React.Component<Iprops, Istate> {
  state = {
    urlInput:''
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  urlUpload = (e:any)=>{
    e.preventDefault()
    this.props.urlUpload({url:this.state.urlInput,})
  }
  render() {
    const { showModal, handleCFClose, item } = this.props

    return (
      <UploadModal
        show={showModal}
        width={640}
        handleClose={handleCFClose}
        title={t`آپلود از آدرس اینترنتی`}
        formDescription={t`برای آپلود آدرس اینترنتی خود را در فرم زیر وارد نمایید`}
      >
        <div className={styles.row}>
          <TextInput style={{ width: 300 }} name={'urlInput'} type={'email'} onChange={this.handleChange} />
          <Button className={['btnPrimary100', 'btnSm']}  onClick={this.urlUpload}>{t`آپلود`}</Button>
        </div>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents, item: state.sidebar.item })

const mapDispatchToProps = (dispatch: any) => {
  return {
  
    urlUpload: (value:any) => dispatch(urlUpload(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UrlUploadModal)
