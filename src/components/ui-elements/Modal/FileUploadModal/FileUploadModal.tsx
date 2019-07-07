import React from 'react'
import { connect } from 'react-redux'
import { getModalDocuments, uploadServer, setUploader } from '../../../../services/internal/store/actions/documents'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import RetryButton from 'react-fine-uploader/retry-button'
import Thumbnail from 'react-fine-uploader/thumbnail'
import Filename from 'react-fine-uploader/filename'
import Status from 'react-fine-uploader/status'
import ProgressBar from 'react-fine-uploader/progress-bar'
import DeleteButton from 'react-fine-uploader/delete-button'
import CancelButton from 'react-fine-uploader/cancel-button'
import 'react-fine-uploader/gallery/gallery.css'
import 'react-fine-uploader/'
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
      console.log(newStatus)
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
    console.log(statusText)
    return (
      <div className={'pg-fixed pg-bg-white pg-w-1/4 pg-bottom-10p pg-left-10p 	pg-text-xs'}>
        {this.state.submittedFiles.map((id: any) => (
          <div className={'pg-flex pg-flex-1 pg-justify-between'}>
            <div style={{ width: '28px' }}>
              <Thumbnail id={id} text={{ upload_successful: 'Success!' }} uploader={this.props.uploader} />
            </div>
            <div className={'pg-flex-1 pg-align-middle pg-p-2 pg-overflow-hidden pg-h-12 pg-max-w-xs pg-justify-center pg-flex pg-items-center'}>
              <Filename id={id} uploader={this.props.uploader} style={{ textOverflow: 'ellipsis'}} />
            </div>
            <div className={'pg-flex pg-flex-1 pg-flex-col pg-items-center'}>
              <div className={'pg-text-xxs pg-justify-content pg-text-center'}>
                <Status id={id} text={statusText} uploader={this.props.uploader} />
              </div>
              <div className={'pg-align-middle'}>
                <ProgressBar
                  id={id}
                  uploader={this.props.uploader}
                  hideBeforeStart={false}
                  hideOnComplete={false}
                  className={this.state.progressColor}
                />
              </div>
            </div>
            <div className={'pg-flex-1 pg-justify-center pg-flex'}>
              {buttonState == 'retry' ? (
                <RetryButton id={id} uploader={this.props.uploader} onlyRenderIfDeletable={false} />
              ) : (
                <CancelButton id={id} uploader={this.props.uploader} />
              )}
            </div>
            {/* <RetryButton id={ id } uploader={ uploader } /> */}
          </div>
        ))}
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
