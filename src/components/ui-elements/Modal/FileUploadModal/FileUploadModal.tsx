import React from 'react'
import { connect } from 'react-redux'
import { getModalDocuments, uploadServer } from '../../../../services/internal/store/actions/documents'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import FileInput from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'
export interface Iprops {}
export interface Istate {}
class FileUploadModal extends React.Component<any, any> {
  uploader: any
  constructor(props: any) {
    super(props)
    this.uploader = new FineUploaderTraditional({
      options: {
        autoUpload: true,
        maxConnections: 3,
        disableCancelForFormUploads: true,
        chunking: {
          enabled: true,
          partSize: 128000,
          concurrent: {
            enabled: false
          }
        },
        extraButtons: {
          folder: true
        },
        request: {
          endpoint: `http://cdn.persiangig.com:9234/uploads`
        },
        callbacks: {
          onComplete: (id: any, name: any, result: any) => {
            console.log(id)
            const { uploadServer } = this.props
            const size = this.uploader.methods.getSize(id)
            const uuid = this.uploader.methods.getUuid(id)
            const parent = 0

            uploadServer({ name, size, id, uuid, parent })
          }
        }
      }
    })
  }

  render() {
    const { showModal, handleClose, loading, modalSelection } = this.props
    return (
      <div className={'pg-fixed pg-bg-white pg-w-1/4 pg-bottom-10p pg-left-10p'}>
        <FileInput dropzone-disabled={ true } multiple accept="image/*" uploader={this.uploader}/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  document: state.document
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    uploadServer: (value: any) => dispatch(uploadServer(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadModal)
