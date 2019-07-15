import * as React from 'react'

// icons and styles
import googlePlus from '../../../../images/socialIcons/google-plus-g-brands.svg'
import twitter from '../../../../images/socialIcons/twitter-brands.svg'
import telegram from '../../../../images/socialIcons/telegram-plane-brands.svg'
import facebook from '../../../../images/socialIcons/facebook-f-brands.svg'
import styles from '../CreateFolderModal/CreateFolder.module.scss'
import { t } from 'ttag'
import { TextInput } from '../../Input/Input'
import { Button } from '../../Button/Button'
import { IconLink } from '../../IconLink'
import { connect } from 'react-redux'
import toast from '../../../../components/ui-elements/Toast/Toast'

export interface Iprops {
  placeholder: string
}

const ShareLinks = (props: any) => {
  let dropDownData = [
    { label: t`عمومی`, description: 'فایل در موتور های جستجو و صفحات پرشین گیگ نمایش داده می شود' },
    { label: t`با لینک`, description: 'فقط توسط کسانی که لینک فوق را در اختیار دارند و کاربران پرشین گیگی که در قسمت پایین مشخص کرده اید' },
    { label: t`خصوصی`, description: 'فقط توسط کابران پرشین گیگ که در بخش مقابل مشخص شده اند' }
  ]
  const [toggleState, setToggleState] = React.useState('off')
  function toggle(e: any) {
    e.preventDefault()
    setToggleState(toggleState === 'off' ? 'on' : 'off')
    if (toggleState === 'off') copyToClipboard(`http://cdn.persiangig.com/download/${props.item.uuid}/${props.item.name}/dl`)
  }

  const copyToClipboard = (placeholder: any) => {
    const textField = document.createElement('textarea')
    textField.innerText = placeholder
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    toast.succeed('کپی شد')
  }
  return (
    <form className={`${styles.shareModal} pg-p-8`}>
      <div className={`${styles.column} `}>
        <h4>لینک اشتراک گذاری</h4>
        <p className={styles.paragraph}>لینک به صفحه نمایش محتویات این فولدر</p>

        <div className={' pg-flex pg-justify-between'}>
          {toggleState == 'off' ? (
            <select className={'pg-w-3/4'} onChange={props.changeSharingStatus} value={props.selected}>
              {dropDownData.map((each: any) => (
                <option>{each.label}</option>
              ))}
            </select>
          ) : (
            <div className={'pg-w-3/4 pg-flex'}>
              <input className={'pg-w-full'} readOnly value={`http://cdn.persiangig.com/download/${props.item.uuid}/${props.item.name}/dl`} />
            </div>
          )}

          <Button className={['pg-btnPrimary100', 'pg-btnMd', 'pg-justify-end']} style={{ marginRight: 10, height: '35px' }} onClick={toggle}>
            {toggleState == 'off' ? t` کپی کردن لینک` : ' پنهان کردن لینک'}
          </Button>
        </div>
        {dropDownData.map((each: any) => {
          if (each.label == props.selected) return <div className={'pg-text-xs pg-mt-1 pg-mb-5 pg-text-gray-700'}>{each.description}</div>
        })}
      </div>
      <div className={styles.column}>
        <div>
          <h4> اشتراک با کاربران پرشین گیگ</h4>
          <p className={styles.paragraph}>ایمیل کاربر را وارد کنید</p>
        </div>
        <div className={`${styles.socialRow}`} style={{ marginBottom: 15 }}>
          <TextInput
            style={{ width: '75%' }}
            name={'userEmail'}
            value={props.value}
            placeholder={'email@example.com'}
            onChange={props.handleChange}
          />
          <Button
            className={['pg-btnPrimary100', 'pg-btnMd']}
            style={{ marginRight: 10, height: '35px' }}
            onClick={props.shareDocument}
          >{t`اشتراک`}</Button>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h4 className={'pg-justify-center pg-flex'}>اشتراک‌گذاری در شبکه‌های اجتماعی</h4>
        <p className={`pg-justify-center pg-flex ${styles.paragraph}`}>لینک به صفحه نمایش محتویات این فولدر</p>
      </div>
      <div className={styles.socialRow} style={{ marginBottom: 20 }}>
        <a href={`https://plus.google.com/share?url=http://cdn.persiangig.com/download/${props.item.uuid}/${props.item.name}/dl`}>
          <IconLink icon={googlePlus} iconAlt={`googleplus`} className={styles.socialIcon} />
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=http://cdn.persiangig.com/download/${props.item.uuid}/${props.item.name}/dl`}>
          <IconLink icon={facebook} iconAlt={`facebook`} className={styles.socialIcon} />
        </a>
        <a href={`https://twitter.com/home?status=http://cdn.persiangig.com/Fdownload/${props.item.uuid}/${props.item.name}/dl`}>
          <IconLink icon={twitter} iconAlt={`twitter`} className={styles.socialIcon} />
        </a>
        <a href={`https://telegram.me/share/url?url=http://cdn.persiangig.com/download/${props.item.uuid}/${props.item.name}/dl`}>
          <IconLink icon={telegram} iconAlt={`telegram`} className={styles.socialIcon} />
        </a>
      </div>
    </form>
  )
}
const mapStateToProps = (state: any) => ({ item: state.sidebar.item })

export default connect(
  mapStateToProps,
  null
)(ShareLinks)
