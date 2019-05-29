import React from 'react'
import { connect } from 'react-redux'
import { UploadModal } from '../../Uploadmodal/Uploadmodal'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { createFolder, getDocuments } from '../../../../services/internal/store/actions/documents'
import { t } from 'ttag'
import styles from '../CreateFolderModal/CreateFolder.module.scss'
import { Modal } from '../Modal'
import { ClipBoard } from '../../Clipboard/Clipboard'
import { IconLink } from '../../IconLink'
import googlePlus from '../../../../images/socialIcons/google-plus-g-brands.svg'
import twitter from '../../../../images/socialIcons/twitter-brands.svg'
import telegram from '../../../../images/socialIcons/telegram-plane-brands.svg'
import facebook from '../../../../images/socialIcons/facebook-f-brands.svg'
import Dropdown from '../../Dropdown/Dropdown'
import { EnhanceDropdown as enhancer } from '../../Dropdown/EnhanceDropdown'

const EnhancedDropdown = enhancer(Dropdown)

export interface Iprops {
  showModal?: boolean
  handleCFClose?: () => void
  createFolder?: any
  getDocuments?: () => void
  document?: any
}
//todo
// validation
class ShareModal extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
  }
  state = {
    name: '',
    description: '',
    showToast: false,
    message: ''
  }

  render() {
    const { showModal, handleCFClose } = this.props
    let dropDownData = [
      { label: t`عمومی` ,description:'فایل در موتور های جستجو و صفحات پرشین گیگ نمایش داده می شود'},
      { label: t`با لینک` ,description:'فقط توسط کسانی که لینک فوق را در اختیار دارند و کاربران پرشین گیگی که در قسمت پایین مشخص کرده اید'},
      { label: t`خصوصی`,description:'فقط توسط کابران پرشین گیگ که در بخش مقابل مشخص شده اند'},

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
                <ClipBoard placeholder={`dsdsad}`} />
              </div>
              <div style={{marginTop:8,marginBottom:12}}>
                <EnhancedDropdown width={295} position={'relative'} data={dropDownData && dropDownData} isOpen={true} noButton={true} bordered={true} selectable={true} optionSelected={0} alwaysOpen={true}/>
              </div>
            </div>
            <div className={styles.column}>
              <div>
                <h4>اشتراک‌گذاری در شبکه‌های اجتماعی</h4>
                <p className={styles.paragraph}>لینک به صفحه نمایش محتویات این فولدر</p>
              </div>
              <div className={styles.socialRow}>
                <IconLink icon={googlePlus} iconAlt={`googleplus`} className={styles.socialIcon} />
                <IconLink icon={facebook} iconAlt={`facebook`} className={styles.socialIcon} />
                <IconLink icon={twitter} iconAlt={`twitter`} className={styles.socialIcon} />
                <IconLink icon={telegram} iconAlt={`telegram`} className={styles.socialIcon} />
              </div>
              <div className={styles.shareUser}>
                <h4> اشتراک با کاربران پرشین گیگ</h4>
                <p className={styles.paragraph}>ایمیل کاربر را وارد کنید</p>
              </div>
              <div className={styles.socialRow} style={{ marginBottom: 45 }}>
                <TextInput style={{ width: 174 }} name={'urlInput'} placeholder={'email@example.com'} />
                <Button className={['btnPrimary100', 'btnSm']} style={{ marginRight: 10 }} >{t`اشتراک`}</Button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state: any) => ({ document: state.document.documents })

const mapDispatchToProps = (dispatch: any) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal)
