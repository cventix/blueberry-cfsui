import React from 'react'

import styles from './CreateFolder.module.scss'
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'
import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { connect } from 'react-redux'

import ICreateFolderInput from '../../../services/internal/repositories/documents'
import { createFolder, getDocuments } from '../../../services/internal/store/actions'

export interface Iprops {
  showModal?: boolean
  handleCFClose: () => void
  createFolder?: any
  getDocuments: () => void
  document?: any
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
    let parentId = this.props.document[0].parent.id
    // await this.props.getDocuments()
    try {
      let result = await this.props.createFolder({ name: this.state.name, parentId })
      this.props.handleCFClose()
      // this.setState({ table: result},()=>console.log(this.state.table))
    } catch (error) {
      console.log('E: ', error)
    }
  }
  // componentWillReceiveProps(nextProps: any) {
  //   console.log(nextProps)
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
      <React.Fragment>
        <UploadModal
          show={showModal}
          handleClose={handleCFClose}
          width={640}
          title={'ایجاد پوشه جدید'}
          formDescription={'برای ایجاد پوشه اطلاعات خود را در فرم زیر وارد نمایید'}
        >
          <form onSubmit={this.handleSubmit}>
            <TextInput placeholder={'نام پوشه'} style={{ width: 300 }} onChange={this.changeHandler} name={'name'} />
            <TextInput placeholder={'توضیحات پوشه'} style={{ width: 300 }} onChange={this.changeHandler} name={'description'} />
            <div className={styles.submitButton}>
              <Button className={['btnPrimary100', 'btnSm']}>ایجاد پوشه</Button>
            </div>
          </form>
        </UploadModal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents})

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
