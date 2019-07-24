import React from 'react'
import { connect } from 'react-redux'
import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { createFolder, getDocuments } from '../../../../services/internal/store/actions/documents'
import { t } from 'ttag'
import styles from './CreateFolder.module.scss'

export interface Iprops {
  showModal?: boolean
  handleCFClose: () => void
  createFolder?: any
  getDocuments: () => void
  document?: any
  parentId?: number
}
//todo
// validation
class CFmodal extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
  }
  state = {
    name: '',
    description: '',
    showToast: false,
    message: ''
  }

  changeHandler = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (e: any) => {
    if (e) e.preventDefault()
    let parentId, parentName

    if (this.props.document.length > 0 && this.props.document[0].parent) {
      parentId = this.props.document[0].parent.id
      parentName = this.props.document[0].parent.name
    } else {
      parentId = this.props.parentId
    }
    // await this.props.getDocuments()
    try {
      let result = await this.props.createFolder({ name: this.state.name, parentId })
      this.props.handleCFClose()
      // this.setState({ table: result},()=>//console.log(this.state.table))
    } catch (error) {
      //console.log('E: ', error)
    }
  }
  // componentWillReceiveProps(nextProps: any) {
  //   //console.log(nextProps)
  //   if (nextProps.document && nextProps.document.id) this.showToast()
  // }
  showToast() {
    this.setState(
      {
        showToast: true,
        message: 'پوشه ایجاد شد'
      },
      () => {
        setTimeout(() => this.setState({ showToast: false }), 3000)
      }
    )
  }
  render() {
    const { showModal, handleCFClose } = this.props
    return (
      <UploadModal
        show={showModal}
        handleClose={handleCFClose}
        width={640}
        title={t`ایجاد پوشه جدید`}
        formDescription={t`برای ایجاد پوشه اطلاعات خود را در فرم زیر وارد نمایید`}
      >
        <form onSubmit={this.handleSubmit}>
          <TextInput placeholder={t`نام پوشه`} style={{ width: 300 }} onChange={this.changeHandler} name={'name'} />
          <TextInput placeholder={t`توضیحات پوشه`} style={{ width: 300 }} onChange={this.changeHandler} name={'description'} />
          <div className={styles.submitButton}>
            <Button className={['pg-btnPrimary', 'pg-btnSm']}>{t`ایجاد`}</Button>
          </div>
        </form>
      </UploadModal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents, parentId: state.document.parentId })

const mapDispatchToProps = (dispatch: any) => {
  return {
    createFolder: (value: any) => dispatch(createFolder(value)),
    getDocuments: () => dispatch(getDocuments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CFmodal)
