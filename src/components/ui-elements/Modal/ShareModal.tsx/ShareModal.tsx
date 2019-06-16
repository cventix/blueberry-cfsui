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
import { shareDocuments, changeSharingStatus } from '../../../../services/internal/store/actions/documents'

export interface Iprops {
  showModal?: boolean
  handleCFClose?: () => void
  createFolder?: any
  getDocuments?: () => void
  document?: any
  item?: any
  shareDocuments?: any
  changeSharingStatus?: any
}

export interface Istate {
  name?: string
  description?: string
  message?: string
  userEmail?: string
  selected?: string
  shareLink?: string
}

class ShareModal extends React.Component<Iprops, Istate> {
  state = {
    name: '',
    description: '',
    message: '',
    userEmail: '',
    selected: t`عمومی`,
    shareLink: ''
  }

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  shareDocument = (e: any) => {
    e.preventDefault()
    this.props.shareDocuments(this.state.userEmail, this.props.item.id)
  }

  changeSharingStatus = (selected: string) => {
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
    if (this.props.item.discriminator == 'F')
      this.setState({
        shareLink: `http://cdn.persiangig.com/download/${this.props.item.uuid}/${this.props.item.name}/dl`
      })
    else
      this.setState({
        shareLink: `http://cdn.persiangig.com/public/${this.props.item.uuid}`
      })
  }

  render() {
    const { showModal, handleCFClose, item } = this.props
    let dropDownData = [
      { label: t`عمومی`, description: 'فایل در موتور های جستجو و صفحات پرشین گیگ نمایش داده می شود' },
      { label: t`با لینک`, description: 'فقط توسط کسانی که لینک فوق را در اختیار دارند و کاربران پرشین گیگی که در قسمت پایین مشخص کرده اید' },
      { label: t`خصوصی`, description: 'فقط توسط کابران پرشین گیگ که در بخش مقابل مشخص شده اند' }
    ]
    return (
      <Modal show={showModal} handleClose={handleCFClose} width={640} title={t`ایجاد پوشه جدید`}>
        <form className={styles.shareModal}>
          <div className={styles.shareRow}>
            <div className={styles.columnRow}>
              <div>
                <h4>لینک اشتراک گذاری</h4>
                <p className={styles.paragraph}>لینک به صفحه نمایش محتویات این فولدر</p>
              </div>
              <div className={'copyBox'}>
                <ClipBoard placeholder={this.state.shareLink} />
              </div>
              <div style={{ marginTop: 8, marginBottom: 12 }}>
                <ul className={styles.listItems}>
                  {dropDownData.map((item: any, i: number) => {
                    return (
                      <li className={styles.listItem} onClick={() => this.changeSharingStatus(item.label)}>
                        <p className={styles.label}>
                          {this.state.selected === item.label ? <span className={styles.checkmark} /> : <span />}
                          <span className={item.isSelected ? styles.text : ' '}>{item.label}</span>
                        </p>
                        <p className={[styles.description, item.isSelected ? styles.text : ' '].join(' ')}>{item.description}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.column}>
              <div>
                <h4>اشتراک‌گذاری در شبکه‌های اجتماعی</h4>
                <p className={styles.paragraph}>لینک به صفحه نمایش محتویات این فولدر</p>
              </div>
              <div className={styles.socialRow}>
                <a href={`https://plus.google.com/share?url=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={googlePlus} iconAlt={`googleplus`} className={styles.socialIcon} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={facebook} iconAlt={`facebook`} className={styles.socialIcon} />
                </a>
                <a href={`https://twitter.com/home?status=http://cdn.persiangig.com/Fdownload/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={twitter} iconAlt={`twitter`} className={styles.socialIcon} />
                </a>
                <a href={`https://telegram.me/share/url?url=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={telegram} iconAlt={`telegram`} className={styles.socialIcon} />
                </a>
              </div>
              <div className={styles.shareUser}>
                <h4> اشتراک با کاربران پرشین گیگ</h4>
                <p className={styles.paragraph}>ایمیل کاربر را وارد کنید</p>
              </div>
              <div className={styles.socialRow} style={{ marginBottom: 45 }}>
                <TextInput style={{ width: 174 }} name={'userEmail'} placeholder={'email@example.com'} onChange={this.handleChange} />
                <Button className={['btnPrimary100', 'btnSm']} style={{ marginRight: 10 }} onClick={this.shareDocument}>{t`اشتراک`}</Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents, item: state.sidebar.item })

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSharingStatus: (value: any) => dispatch(changeSharingStatus(value)),
    shareDocuments: (userEmails: any, documentIds: any) => dispatch(shareDocuments(userEmails, documentIds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal)
