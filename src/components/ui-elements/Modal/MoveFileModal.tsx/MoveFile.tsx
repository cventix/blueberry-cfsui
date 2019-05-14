import React from 'react'
import { connect } from 'react-redux'

import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { moveDocuments, getDocuments } from '../../../../services/internal/store/actions/documents'
import { ContentBody } from '../../../Content/ContentBody'

import styles from './MoveFile.module.scss'
import { Button } from '../../Button/Button'
import { navigateObject } from '../../../Content/Content'

export interface Iprops {
  showModal?: boolean
  handleClose: () => void
  createFolder?: any
  document?: any
  getDocuments?: any
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
  onGetDocument = async (isChildren?: boolean, path?: any) => {
    if (isChildren == true) {
      try {
        await this.props.getDocuments({ isChildren: true, path,modal:true })
      } catch (error) {
        console.log('E: ', error)
      }
    } else {
      try {
        await this.props.getDocuments({modal:true})
      } catch (error) {
        console.log('E: ', error)
      }
    }
  }
  handleNavigate = ({ e, name, id }: navigateObject) => {
    if (e.target.tagName != 'INPUT') {
      let discriminator = this.props.document.documents.filter((obj: any) => {
        console.log(obj.name == name)
        return obj.name == name
      })[0].discriminator
      if (discriminator === 'D') {
        this.onGetDocument(true, name)
      }
    }
  }

  render() {
    let table = this.props.document.documents
    const { showModal, handleClose } = this.props
    return (
      <UploadModal show={showModal} handleClose={handleClose} width={640} title={'انتقال'} formDescription={'پوشه مقصد را انتخاب کنید'}>
        <div className={styles.move}>
          <ContentBody view={'grid'} table={table} isMoveModal={true} dropdown={false} checkbox={false} hasHeader={false} handleNavigate={this.handleNavigate} />
        </div>
        <div className={styles.submitButton}>
          <Button className={[this.state.fileId ? 'btnPrimary100' : 'btnPrimaryOutline', 'btnSm']} style={{ marginLeft: 5 }} disabled={true}>
            انتقال
          </Button>
          <Button className={['btnDefault100', 'btnSm']} onClick={handleClose}>انصراف</Button>
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
