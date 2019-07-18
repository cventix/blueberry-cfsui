import * as React from 'react'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolderModal/CreateFolder.module.scss'
import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { renameFolder } from '../../../../services/internal/store/actions'
import { connect } from 'react-redux'
import { ItemInterface } from '../../../../services/internal/store/reducers/documentReducer'
import { runInThisContext } from 'vm'

interface Iprops {
  value?: string
  showModal?: boolean
  item: ItemInterface
  table?: any
  updateTable?: (table: any) => void
  handleSubmit?: (e: any) => void
  changeHandler?: (e: any) => void
  renameFolder: (e: any) => void
  handleClose?: () => void
}

class RenameFile extends React.Component<Iprops, any> {
  state = {
    renameInput: this.props.item.name
  }
  onRenameDocument = async (result: any) => {
    let table = this.props.table
    table.map((each: any) => {
      if (each.id === this.props.item.id) each.name = result.payload.name
    })
    this.props.updateTable && this.props.updateTable(table)
  }
  changeHandler = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async (e: any) => {
    if (e) e.preventDefault()
    try {
      let result = await this.props.renameFolder({ folderId: this.props.item.id, name: this.state.renameInput })
      this.onRenameDocument(result)
    } catch (error) {
      //console.log('E: ', error)
    }
  }
  render() {
    let { handleClose, showModal } = this.props
    return (
      <UploadModal show={showModal} width={640} title={'تغییر نام'} formDescription={' نام جدید را در فرم زیر وارد نمایید'} handleClose={handleClose}>
        <form onSubmit={this.handleSubmit}>
          <TextInput value={this.state.renameInput} style={{ width: 300 }} onChange={this.changeHandler} name={'renameInput'} />
          <div className={styles.submitButton}>
            <Button className={['pg-btnPrimary100', 'pg-btnSm']}>تغییر نام</Button>
          </div>
        </form>
      </UploadModal>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    renameFolder: (value: any) => dispatch(renameFolder(value))
  }
}

const mapStateToProps = (state: any) => ({
  item: state.sidebar.item
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenameFile)
