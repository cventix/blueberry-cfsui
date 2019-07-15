import React from 'react'
import { connect } from 'react-redux'

import MyVideoPlayer from '../../MediaPlayer/MediaPlayer'
import { Preview } from '../../ui-elements/Preview/Preview'
import { Icon } from '../../ui-elements/Icon'
import { IGenerateLinkInput } from '../../../services/internal/repositories/documents'
import { generateDownloadLink, setSidebarItems } from '../../../services/internal/store/actions'

class PreviewContent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  downloadFile = async () => {
    let uuid = this.props.item.uuid
    let result = await this.props.generateDownloadLink(uuid)
    setTimeout(() => {
      if (result && this.props.downloadToken && this.props.downloadToken.length > 0)
        window.location.href = `http://cdn.persiangig.com/dl/${this.props.downloadToken}/${this.props.item.uuid}/${this.props.item.name}`
    }, 2000)
  }

  goNext = (add: number) => {
    console.log(this.props.item.id)
    let index = this.props.document.documents.findIndex((p: any) => p.id == this.props.item.id)
    let firstFileIndex = this.props.document.documents.findIndex((a: any) => a.discriminator === 'F')
    if (this.props.document.documents[index].discriminator === 'F') {
      let item = this.props.document.documents[+index + add]
      if (+index + add > this.props.document.documents.length - 1) {
        let index = firstFileIndex
        item = this.props.document.documents[index]
      }

      if (+index + add < firstFileIndex) {
        let reversed = this.props.document.documents.filter((item: any) => {
          return item.discriminator === 'F'
        })
        item = reversed[reversed.length - 1]
      }
      if (item) {
        this.props.history.push(`/fm/preview/${item.genericType}${item.genericType === 'image' ? '/' + this.props.image : ''}/${item.name}`)
        this.props.setItem(item)
      }
    }
  }

  public render() {
    let content
    switch (this.props.item.genericType) {
      case 'image':
        content = (
          <img className={'cover'} id={'map'} src={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`} />
        )
        break
      case 'video':
        content = <MyVideoPlayer url={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`} />
        break
      case 'audio':
        content = (
          <MyVideoPlayer
            url={`http://cdn.persiangig.com/preview/${this.props.item.uuid}/${this.props.image}/${this.props.item.name}`}
            type={'audio'}
          />
        )
        break
      default:
        content = <Icon mimetype={this.props.item.genericType} style={{ width: 300 }} />
        break
    }
    return (
      <Preview
        show={this.props.showModal}
        type={'music'}
        item={this.props.item}
        handleClose={this.props.handleClose}
        goTo={this.goNext}
        onDownloadFile={this.downloadFile}
      >
        {content}
      </Preview>
    )
  }
}

const mapStateToProps = (state: any) => ({
  document: state.document,
  item: state.sidebar.item,
  image: state.sidebar.image,
  downloadToken: state.sidebar.downloadToken,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    generateDownloadLink: (value: IGenerateLinkInput) => dispatch(generateDownloadLink(value)),
    setItem: (value: any) => dispatch(setSidebarItems(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewContent)
