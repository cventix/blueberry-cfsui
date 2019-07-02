import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { ClipBoard } from '../../Clipboard/Clipboard'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { IconLink } from '../../IconLink'
import { Modal } from '../Modal'

//services
import { shareDocuments, changeSharingStatus } from '../../../../services/internal/store/actions/documents'

// icons and styles
import googlePlus from '../../../../images/socialIcons/google-plus-g-brands.svg'
import telegram from '../../../../images/socialIcons/telegram-plane-brands.svg'
import facebook from '../../../../images/socialIcons/facebook-f-brands.svg'
import twitter from '../../../../images/socialIcons/twitter-brands.svg'
import styles from '../CreateFolderModal/CreateFolder.module.scss'

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
          <div className='pg-flex pg-flex-row pg-mt-0 pg-mb-0 pg-mr-10p pg-ml-10p'>
            <div className='pg-flex pg-flex-col pg-w-50% pg-ml-10'>
              <div>
                <h4 className='pg-text-gray-800 pg-text-sm pg-font-vThin'>لینک اشتراک گذاری</h4>
                <p className='pg-mb-15p pg-text-10p pg-text-gray-600'>لینک به صفحه نمایش محتویات این فولدر</p>
              </div>
              <div className={'copyBox'}>
                <ClipBoard placeholder={this.state.shareLink} />
              </div>
              <div style={{ marginTop: 8, marginBottom: 12 }}>
                <ul className={`pg-rounded-sm flex-col-wrap pg-shadow-sm pg-text-right pg-z-4 pg-bg-white pg-text-xs ${styles.listItems}`}>
                  {dropDownData.map((item: any, i: number) => {
                    return (
                      <li style={{ display: 'flex', padding: '0 10px' }}>
                        <li style={{ width: '10px' }}> {this.state.selected === item.label ? <span className={`pg-inline-block pg-relative pg-h-20% ${styles.checkmark}`} /> : <span />}</li>
                        <li className='pg-flex pg-flex-col pg-cursor-pointer pg-text-gray-700 pg-pt-0 pg-pr-10p pg-pb-0 pg-pl-0' onClick={() => this.changeSharingStatus(item.label)}>
                          <p className={styles.label}>
                            <span className={item.isSelected ? 'pg-mr-17p' : ' '}>{item.label}</span>
                          </p>
                          <p className={[styles.description, item.isSelected ? 'pg-mr-17p' : ' '].join(' ')}>{item.description}</p>
                        </li>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.column}>
              <div>
                <h4 className='pg-text-gray-800 pg-text-sm pg-font-vThin'>اشتراک‌گذاری در شبکه‌های اجتماعی</h4>
                <p className='pg-mb-15p pg-text-10p pg-text-gray-600'>لینک به صفحه نمایش محتویات این فولدر</p>
              </div>
              <div className='flex-center pg-flex-row'>
                <a href={`https://plus.google.com/share?url=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={googlePlus} iconAlt={`googleplus`} className={`flex-center pg-w-35p pg-h-35p pg-rounded-sm pg-bg-white pg-ml-14p ${styles.socialIcon}`} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={facebook} iconAlt={`facebook`} className={`flex-center pg-w-35p pg-h-35p pg-rounded-sm pg-bg-white pg-ml-14p ${styles.socialIcon}`} />
                </a>
                <a href={`https://twitter.com/home?status=http://cdn.persiangig.com/Fdownload/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={twitter} iconAlt={`twitter`} className={`flex-center pg-w-35p pg-h-35p pg-rounded-sm pg-bg-white pg-ml-14p ${styles.socialIcon}`} />
                </a>
                <a href={`https://telegram.me/share/url?url=http://cdn.persiangig.com/download/${item.uuid}/${item.name}/dl`}>
                  <IconLink icon={telegram} iconAlt={`telegram`} className={`flex-center pg-w-35p pg-h-35p pg-rounded-sm pg-bg-white pg-ml-14p ${styles.socialIcon}`} />
                </a>
              </div>
              <div className='pg-mt-50p pg-mb-15p'>
                <h4 className='pg-text-gray-800 pg-text-sm pg-font-vThin'> اشتراک با کاربران پرشین گیگ</h4>
                <p className='pg-mb-15p pg-text-10p pg-text-gray-600'>ایمیل کاربر را وارد کنید</p>
              </div>
              <div className='flex-center pg-flex-row' style={{ marginBottom: 45 }}>
                <TextInput style={{ width: 174 }} name={'userEmail'} placeholder={'email@example.com'} onChange={this.handleChange} />
                <Button className={['pg-btnPrimary', 'pg-btnSm']} style={{ marginRight: 10 }} onClick={this.shareDocument}>{t`اشتراک`}</Button>
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
