import React from 'react'
import { connect } from 'react-redux'

import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { moveDocuments, getDocuments } from '../../../../services/internal/store/actions/documents'
import { ContentBody } from '../../../Content/ContentBody'

import styles from './MoveFile.module.scss'
import { Button } from '../../Button/Button'

export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  createFolder?: any
  document?: any
}
class MoveFile extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
  }
  state = {
    name: '',
    description: '',
    showToast: false,
    message: '',
    fileId: ''
  }

  render() {
    let table = this.props.document.documents
    const { showModal, handleClose } = this.props
    return (
      <UploadModal show={showModal} handleClose={handleClose} width={640} title={'انتقال'} formDescription={'پوشه مقصد را انتخاب کنید'}>
        <div className={styles.move}>
          <ContentBody view={'grid'} table={table} isMoveModal={true} dropdown={false} checkbox={false} hasHeader={false} />
        </div>
        <div className={styles.submitButton}>
          <Button className={[this.state.fileId ? 'btnPrimary100' : 'btnPrimaryOutline', 'btnSm']} style={{ marginLeft: 5 }} disabled={true}>
            انتقال
          </Button>
          <Button className={['btnDefault100', 'btnSm']}>انصراف</Button>
        </div>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document, loading: state.loading.isLoading })

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: (value: any) => dispatch(getDocuments(value)),
    moveDocuments: () => dispatch(moveDocuments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveFile)
