import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { t } from 'ttag'


// ui-elements & intenal-components
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { Button } from '../../../components/ui-elements/Button/Button'
import { IconLink } from '../../../components/ui-elements/IconLink'
import { Icon } from '../../../components/ui-elements/Icon'
import { Authentication } from '../Authentication'
import { ReCaptcha } from '../ReCaptcha/ReCaptcha'

// services
import { setUserCredentials, setToken, login, register, removeMessages } from '../../../services/internal/store/actions'
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'

// styles & icons
import styles from '../Authentication.module.scss'
import error from '../../../images/error.svg'

function validate(email: string, password: string) {
  return {
    email: email.length === 0,
    password: password.length === 0
  }
}

class Register extends React.Component<any, any> {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    error: '',
    token: undefined
  }

  handleChange = (e: any) => {
    this.setState({ error: '' })
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleBlur = () => {
    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({ error: 'تکرار رمز عبور مطابق نمی‌باشد' })
    }
    if (this.state.password.length < 3) {
      this.setState({ error: `رمز عبور باید دست کم سه حرف باشد.` })
    }

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      this.setState({ error: `ایمیل صحیح نمی باشد` })
    }
    if (!/^(?=.{5,45}$)(?![0-9])^[a-zA-Z0-9]/.test(this.state.username)) {
      this.setState({
        error: ` نام کاربری باید بین ۵ تا ۴۵ حرف باشد، با عدد شروع نشود و تنها شامل حروف انگلیسی و اعداد باشد.`
      })
    }
  }
  handleSubmit = async (e: any) => {
    const { history } = this.props
    if (e) e.preventDefault()
    await this.props.removeMessages()
    if (!this.state.password) {
      this.setState({ error: `لطفا رمزعبور خود را وارد نمایید.` })
    }
    if (!this.state.passwordRepeat) {
      this.setState({ error: `لطفا تکرار رمزعبور خود را وارد نمایید.` })
    }
    if (!this.state.email) {
      this.setState({ error: `لطفا ایمیل خود را وارد نمایید.` })
    }
    if (!this.state.username) {
      this.setState({ error: `لطفا نام کاربری خود را وارد نمایید.` })
    }
    if (!this.state.error && this.state.token)
      try {
        await this.props.register(this.state.email, this.state.username, this.state.password, this.state.token)
      } catch (error) {
        console.log('E: ', error)
      }
  }
  handleClick = async (e: React.MouseEvent<HTMLButtonElement>, execute: () => Promise<string>) => {
    const token = await execute()
    this.setState({ token })
    console.log(token)
  }

  render() {
    return (
      <Authentication>
        <form onSubmit={this.handleSubmit}>
          <span className={`pg-text-gray-800 pg-leading-usuall pg-text-base ${styles.title}`}>{t`ثبت‌نام کاربر جدید`}</span>
          <p className={`pg-text-gray-800 pg-mb-38p pg-text-xs ${styles.description}`}>{t`برای استفاده از خدمات ابتدا ثبت‌نام شوید`}</p>
          <TextInput placeholder={t`نام کاربری`} name={'username'} onChange={this.handleChange} onBlur={this.handleBlur} />
          <TextInput placeholder={t`ایمیل`} type={'email'} name={'email'} onChange={this.handleChange} onBlur={this.handleBlur} />
          <TextInput placeholder={t`رمز عبور`} name={'password'} type={'password'} onChange={this.handleChange} onBlur={this.handleBlur} />
          <TextInput
            placeholder={t`تکرار رمز عبور`}
            name={'passwordRepeat'}
            type={'password'}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <div className={`flex-row-wrap-withspace pg-h-35p pg-mt-14p pg-text-gray-800 ${styles.row}`}>
            <div className={`flex-center pg-flex-row pg-flex-wrap ${styles.switch}`}>
              {t`عضو هستید؟`}
              <Link to={'/login'}>
                <span className={styles.link}>{t`ورود`}</span>
              </Link>
            </div>
            <ReCaptcha action="test">
              {captcha => (
                <div>
                  <Button
                    className={['pg-btnPrimary', 'pg-btnSm']}
                    onClick={(e: any) => this.handleClick(e, captcha.execute)}
                    disabled={!captcha.isReady}
                  >
                    {t`ثبت‌نام`}
                  </Button>
                </div>
              )}
            </ReCaptcha>
          </div>
          {this.state.error && (
            <div className={[styles.wrongVerify, styles.warn].join(' ')}>
              <IconLink icon={error} label={t`${this.state.error}`} />
            </div>
          )}
          {this.props.messages.errors.length > 0 && (
            <div className={[styles.wrongVerify, styles.warn].join(' ')}>
              <IconLink icon={error} label={t`${this.props.messages.errors}`} />
            </div>
          )}
        </form>
      </Authentication>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (email: string, username: string, password: string, reCaptcha: string) => dispatch(register(email, username, password, reCaptcha)),
    removeMessages: (payload: PayloadInterface) => dispatch(removeMessages(payload))
  }
}

const mapStateToProps = (state: any) => ({ isLoading: state.loading.isLoading, auth: state.auth, messages: state.messages })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
