import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { Modal } from '../Modal'
import { ClipBoard } from '../../Clipboard/Clipboard'
import { IconLink } from '../../IconLink'

// icons and styles
import googlePlus from '../../../../images/socialIcons/google-plus-g-brands.svg'
import twitter from '../../../../images/socialIcons/twitter-brands.svg'
import telegram from '../../../../images/socialIcons/telegram-plane-brands.svg'
import facebook from '../../../../images/socialIcons/facebook-f-brands.svg'
import styles from '../CreateFolderModal/CreateFolder.module.scss'

//services
import { shareDocuments, changeSharingStatus, addDescription } from '../../../../services/internal/store/actions/documents'
import { AddDescription } from './AddDescription'
import ShareLinks from './ShareLinks'

export interface Iprops {
  showModal?: boolean
  handleCFClose?: () => void
  createFolder?: any
  getDocuments?: () => void
  document?: any
  item?: any
  shareDocuments?: any
  addDescription?: any
  changeSharingStatus?: any
}

export interface Istate {
  name?: string
  description?: string
  message?: string
  userEmail?: string
  selected?: string
  shareLink?: string
  view?: string
}

class ShareModal extends React.Component<Iprops, Istate> {
  state = {
    name: '',
    description: '',
    message: '',
    userEmail: '',
    selected: t`عمومی`,
    shareLink: '',
    view: 'AddDesc'
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  shareDocument = (e: any) => {
    e.preventDefault()
    this.props.shareDocuments(this.state.userEmail, this.props.item.id)
  }

  changeSharingStatus = (e: any) => {
    let selected = e.target.value
    if (this.state.selected !== selected) {
      this.setState({ selected })
      switch (selected) {
        case t`با لینک`:
          this.props.changeSharingStatus({ id: this.props.item.id, sharingStatus: 'WITH_LINK' })
          break
        case t`خصوصی`:
          this.props.changeSharingStatus({ id: this.props.item.id, sharingStatus: 'PRIVATE' })
          break
        case t`عمومی`:
          this.props.changeSharingStatus({ id: this.props.item.id, sharingStatus: 'PUBLIC' })
          break
      }
    }
  }
  componentDidMount() {
    if (this.props.item.description) this.setState({ description: this.props.item.description })
    if (this.props.item.discriminator == 'F')
      this.setState({
        shareLink: `http://cdn.persiangig.com/download/${this.props.item.uuid}/${this.props.item.name}/dl`
      })
    else
      this.setState({
        shareLink: `http://cdn.persiangig.com/public/${this.props.item.uuid}`
      })
  }
  changeView = (view: string) => {
    this.setState({ view })
  }

  addDescription = () => {
    this.props.addDescription({ id: this.props.item.id, description: this.state.description })
    this.changeView('ShareLink')
  }

  render() {
    const { showModal, handleCFClose, item } = this.props

    let view
    switch (this.state.view) {
      case 'AddDesc':
        view = (
          <AddDescription
            handleChange={this.handleChange}
            value={this.state.description}
            addDescription={this.addDescription}
            changeView={this.changeView}
          />
        )
        break
      case 'ShareLink':
        view = (
          <ShareLinks
            handleChange={this.handleChange}
            value={this.state.userEmail}
            item={this.props.item}
            changeSharingStatus={this.changeSharingStatus}
            selected={this.state.selected}
            shareDocument={this.shareDocument}
          />
        )
        break
    }
    return (
      <Modal show={showModal} handleClose={handleCFClose} width={640} title={t`اشتراک گذاری`}>
        {view}
      </Modal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents, item: state.sidebar.item })

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSharingStatus: (value: any) => dispatch(changeSharingStatus(value)),
    shareDocuments: (userEmails: any, documentIds: any) => dispatch(shareDocuments(userEmails, documentIds)),
    addDescription: (value: any) => dispatch(addDescription(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal)
