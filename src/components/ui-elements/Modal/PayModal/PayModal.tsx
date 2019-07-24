import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolderModal/CreateFolder.module.scss'

//services
import { urlUpload } from '../../../../services/internal/store/actions/documents'
import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { formatPrice } from '../../../../services/internal/utils/formatPrice'

export interface Iprops {
  showModal?: boolean
  handleCFClose?: () => void
  createFolder?: any
  getDocuments?: () => void
  document?: any
  item?: any
  urlUpload?: any
  changeSharingStatus?: any
  userInfo?: any
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

class PayModal extends React.Component<Iprops, any> {
  state = {
    urlInput: '',
    price: 0,
    active: 0
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  setPrice = (price: number) => {
    this.setState({ price, active: price })
  }
  urlUpload = (e: any) => {
    e.preventDefault()
    this.props.urlUpload({ url: this.state.urlInput })
  }
  render() {
    const { showModal, handleCFClose, item } = this.props

    return (
      <UploadModal show={showModal} width={640} handleClose={handleCFClose} title={t`آپلود از آدرس اینترنتی`} formDescription={t``}>
        <div className={styles.row}>
          <div className={'pg-flex pg-justify-center pg-flex-col'}>
            <h2 className={'pg-text-xl pg-my-2 pg-text-center '}>{formatPrice(this.props.userInfo.balance)}</h2>
            <div className={'pg-text-l pg-mb-5 pg-text-center '}>اعتبار شما</div>
          </div>
          <div>میزان اعتبار مورد نظرتان را وارد نمایید.</div>
          <div className={'pg-flex pg-text-center pg-my-3'}>
            <div onClick={() => this.setPrice(20000)} className={`${this.state.active == 20000 && 'pg-bg-blue-400 pg-text-white pg-cursor-default' } pg-cursor-pointer pg-rounded-sm pg-border pg-p-2 pg-w-full pg-ml-3`}>
              20000
            </div>
            <div onClick={() => this.setPrice(40000)} className={`${this.state.active == 40000 && 'pg-bg-blue-400 pg-text-white pg-cursor-default' } pg-cursor-pointer pg-rounded-sm pg-border pg-p-2 pg-w-full pg-ml-3`}>
              40000
            </div>
            <div onClick={() => this.setPrice(60000)} className={`${this.state.active == 60000 && 'pg-bg-blue-400 pg-text-white pg-cursor-default' } pg-cursor-pointer pg-rounded-sm pg-border pg-p-2 pg-w-full `}>
              60000
            </div>
          </div>
          <div className={'pg-relative'}>
            <TextInput name={'price'} value={this.state.price} onChange={this.handleChange} />
            <span className={'pg-absolute'} style={{ top: '7px', left: '8px' }}>
              تومان
            </span>
          </div>
          <Button className={['pg-btnPrimary', 'pg-btnSm', 'pg-mt-5']} style={{ width: '100%' }} onClick={this.urlUpload}>{t`پرداخت`}</Button>
        </div>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents, item: state.sidebar.item, userInfo: state.account.info })

const mapDispatchToProps = (dispatch: any) => {
  return {
    urlUpload: (value: any) => dispatch(urlUpload(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PayModal)
