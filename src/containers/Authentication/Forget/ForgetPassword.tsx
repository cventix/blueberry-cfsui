import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { Authentication } from '../Authentication'

// ui-elements
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { Button } from '../../../components/ui-elements/Button/Button'
import { Icon } from '../../../components/ui-elements/Icon'

// icons & styles
import loading from '../../../images/loading/tail-spin.svg'
import styles from '../Authentication.module.scss'
import error from '../../../images/error.svg'
import success from '../../../images/icon-upload-done.svg'

// services
import { forgetPassword, removeMessages } from '../../../services/internal/store/actions'
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'
import { IconLink } from '../../../components/ui-elements/IconLink'

class ForgetPassword extends React.Component<any, any> {
  state = {
    email: '',
    msg: false,
    loading: false
  }

  handleChange = (e: any) => {
    console.log(e.target)
    this.setState({
      msg: false,
      [e.target.name]: e.target.value
    })
  }

  onBlur = async () => {
    await this.props.removeMessages()
  }

  handleSubmit = async (e: any) => {
    if (e) e.preventDefault()
    this.setState({ msg: true })
    try {
      let result = await this.props.forgetPassword({ email: this.state.email })
      console.log(result)
    } catch (error) {
      console.log('E: ', error)
    }
  }

  render() {
    console.log(this.props.messages.msgs)
    return (
      <Authentication>
        <form className={styles.login} onSubmit={this.handleSubmit}>
          <span className={styles.title}>{t`بازیابی رمز عبور`}</span>
          <p className={styles.description}>{t`لطفا ایمیل خود را وارد نمایید تا لینک بازیابی رمز عبور برایتان فرستاده شود`}</p>
          <TextInput placeholder={t`ایمیل`} name={'email'} onChange={this.handleChange} onBlur={this.onBlur} />
          <div className={styles.row}>
            <div className={styles.switch}>
              {t`عضو نیستید؟`}
              <Link to={'/register'}>
                <span className={styles.link}>{t`ثبت‌نام`}</span>
              </Link>
            </div>

            <Button className={[this.props.isLoading && !this.state.loading ? 'btnSecondary' : 'btnSuccess0', 'btnSm']} style={{ width: '35%' }}>
              {this.props.isLoading && !this.state.loading && (
                <div className={styles.buttonLoading}>
                  <Icon src={loading} />
                </div>
              )}
              {t`ارسال‌ایمیل`}
            </Button>
          </div>
          {this.props.messages.errors.length > 0 && this.state.msg && (
            <div className={[styles.wrongVerify, styles.warn].join(' ')}>
              <IconLink icon={error} label={t`${this.props.messages.errors}`} />
            </div>
          )}
          {this.props.messages.msgs.length > 0 && this.state.msg && (
            <div className={[styles.wrongVerify, styles.success].join(' ')}>
              <IconLink icon={success} label={t`${this.props.messages.msgs}`} />
            </div>
          )}
        </form>
      </Authentication>
    )
  }
}

const mapStateToProps = (state: any) => ({ isLoading: state.loading.isLoading, auth: state.auth, messages: state.messages })

const mapDispatchToProps = (dispatch: any) => {
  return {
    forgetPassword: (payload: PayloadInterface) => dispatch(forgetPassword(payload)),
    removeMessages: (payload: PayloadInterface) => dispatch(removeMessages(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPassword)
