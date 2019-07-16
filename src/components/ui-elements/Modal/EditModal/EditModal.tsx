import * as React from 'react'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'

import styles from '../CreateFolderModal/CreateFolder.module.scss'
import { UploadModal } from '../Uploadmodal/Uploadmodal'
import { renameFolder, changeProfile } from '../../../../services/internal/store/actions'
import { connect } from 'react-redux'
import { ItemInterface } from '../../../../services/internal/store/reducers/documentReducer'
import { runInThisContext } from 'vm'
import { Select } from '../../Select/Select'

interface Iprops {
  value?: string
  showModal?: boolean
  item: ItemInterface
  table?: any
  formDescription?: string
  title?: string
  input?: any
  updateTable?: (table: any) => void
  handleSubmit?: (e: any) => void
  changeHandler?: (e: any) => void
  renameFolder: (e: any) => void
  handleClose?: () => void
}

class EditModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      displayname: ''
    }
  }
  componentDidMount() {
    this.props.input.map((each: any) => {
      console.log(each.value)
      this.setState({ [each.name]: each.value })
    })
  }

  render() {
    let { handleClose, showModal } = this.props

    console.log(this.props)
    return (
      <UploadModal show={showModal} width={440} title={this.props.title} formDescription={this.props.formDescription} handleClose={handleClose}>
        <form onSubmit={this.props.profileChange} className={'pg-w-full'}>
          {this.props.input.map((each: any) =>
            each.selectable ? (
              <div className={'pg-flex pg-w-full pg-justify-end'}>
                <Select
                  onChange={this.props.updateChange}
                  name={each.name}
                  optionsArray={each.name == 'city' ? this.props.cities : each.optionsArray}
                  value={each.value}
                />
              </div>
            ) : (
              <TextInput value={each.value} style={{ width: '100%' }} onChange={this.props.updateChange} name={each.name} />
            )
          )}

          <div className={`${styles.submitButton} pg-mt-5`}>
            <Button className={['pg-btnPrimary100', 'pg-btnSm']}>ویرایش</Button>
          </div>
        </form>
      </UploadModal>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeProfile: (value: any) => dispatch(changeProfile(value))
  }
}

const mapStateToProps = (state: any) => ({
  info: state.account.info,
  cities: state.account.cities
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditModal)
