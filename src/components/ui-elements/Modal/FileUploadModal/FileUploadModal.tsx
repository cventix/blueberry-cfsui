import React from 'react'
import { connect } from 'react-redux'
import { getModalDocuments, uploadServer, setUploader } from '../../../../services/internal/store/actions/documents'

import 'react-fine-uploader/gallery/gallery.css'
import 'react-fine-uploader/'
import { Icon } from '../../Icon'
import close from '../../../../images/icon-btn-refresh-copy.svg'
import styles from '../Modal.module.scss'
import UploadItem from './UploadItem';
export interface Iprops {}
export interface Istate {}
const isFileGone = (status: any) => {
  return ['canceled', 'deleted'].indexOf(status) >= 0
}
class FileUploadModal extends React.Component<any, any> {
  uploader: any
  constructor(props: any) {
    super(props)
    this.state = {
      submittedFiles: [],
      buttonState: 'cancle',
      progressColor: 'yellow'
    }
  }
  componentDidMount() {
    // this.props.uploader.on('submitted', (id: any) => {
    //   const submittedFiles = this.state.submittedFiles

    //   submittedFiles.push(id)
    //   this.setState({ submittedFiles })
    // })
    this.props.uploader.on('statusChange', (id: any, oldStatus: any, newStatus: any) => {
      //console.log(newStatus)
      if (newStatus === 'submitted') {
        const submittedFiles = this.state.submittedFiles

        submittedFiles.push(id)
        this.setState({ submittedFiles })
      } else if (isFileGone(newStatus)) {
        const submittedFiles = this.state.submittedFiles
        const indexToRemove = submittedFiles.indexOf(id)

        submittedFiles.splice(indexToRemove, 1)
        this.setState({ submittedFiles })
        if (newStatus == 'upload failed') {
          this.setState({ buttonState: 'retry', progressColor: 'red', uploadState: 'خطا در آپلود' })
        }
      } else if (newStatus == 'upload successful') {
        this.setState({ buttonState: 'cancel', progressColor: 'green', uploadState: 'انجام شد' })
      } else if (newStatus == 'uploading') {
        this.setState({ uploadState: 'در حال آپلود' })
      }
    })
  }

  render() {
    const { buttonState } = this.state
    const statusText = {
      upload_failed: 'خطا در آپلود',
      upload_successful: 'انجام شد',
      uploading: 'در حال آپلود'
    }
    //console.log(statusText)
    return (
      <div className={this.props.showModal ? [styles.displayBlock].join(' ') : [ styles.displayNone].join(' ')}>
        <div className={'pg-fixed pg-bg-white pg-w-1/3 pg-bottom-10p pg-left-10p pg-rounded-sm	pg-text-xs'}>
          {this.state.submittedFiles.length > 0 && (
            <div className={'pg-w-full pg-bg-blue-400 pg-rounded-t-sm pg-p-2 pg-flex pg-justify-between'}>
              <div className={'pg-text-white'}>بارگذاری فایل</div>
              <div className={'pg-text-white pg-cursor-pointer'} onClick={this.props.handleClose}>
                انصراف <Icon className={styles.closeIcon} src={close} />
              </div>
            </div>
          )}
          {this.state.submittedFiles.map((id: any) => (
           <UploadItem id={id}/>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  uploader: state.document.uploader
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    uploadServer: (value: any) => dispatch(uploadServer(value)),
    setUploader: (value: any) => dispatch(setUploader(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadModal)
