import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements & internal-components
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { Button } from '../../../components/ui-elements/Button/Button'
import { IconLink } from '../../../components/ui-elements/IconLink'
import { Icon } from '../../../components/ui-elements/Icon'
import { Authentication } from '../Authentication'

// services
import { setUserCredentials, setToken, login, removeMessages } from '../../../services/internal/store/actions'
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'

// icons & styles
import loading from '../../../images/loading/tail-spin.svg'
import lock from '../../../images/typeIcons/login/lock.svg'
import error from '../../../images/error.svg'
import styles from '../Authentication.module.scss'

class Login extends React.Component<any, any> {
  state = {
    email: '',
    password: '',
    loading: false,
    token: '',
    msg: false
  }

  handleChange = async (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onBlur = async () => {
    await this.props.removeMessages()
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({ token: nextProps.auth.token })
  }
  handleSubmit = async (e?: any) => {
    const { history } = this.props

    if (e) e.preventDefault()
    await this.props.removeMessages()
    try {
      let result = await this.props.login({ email: this.state.email, password: this.state.password })
      console.log(result)
    } catch (error) {
      console.log('E: ', error)
    }
  }

  componentDidMount() {}

  render() {
    if (this.state.token) {
      return <Redirect to="/fm" />
    } else if (!this.state.token) {
      window.document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
      localStorage.clear()
      return (
        <Authentication>
          <form className={styles.login} onSubmit={this.handleSubmit}>
            <span className={`pg-text-gray-800 pg-leading-usuall pg-text-base ${styles.title}`}>{t`ورود به حساب کاربری`}</span>
            <p className={`pg-text-gray-800 pg-mb-38p pg-text-xs ${styles.description}`}>{t`برای استفاده از خدمات ابتدا وارد شوید`}</p>
            <TextInput placeholder={t`نام کاربر یا ایمیل`} name={'email'} onChange={this.handleChange} onBlur={this.onBlur} />
            <TextInput placeholder={t`رمز عبور`} name={'password'} type={'password'} onChange={this.handleChange} />
            <div className={`flex-row-wrap-withspace pg-h-35p pg-mt-14p pg-text-gray-800 ${styles.row}`}>
              <div className={`flex-center pg-flex-row pg-flex-wrap ${styles.switch}`}>
                {t`عضو نیستید؟`}
                <Link to={'/register'}>
                  <span className={styles.link}>{t`ثبت‌نام`}</span>
                </Link>
              </div>
              <Button
                loading={this.props.isLoading && !this.state.loading}
                className={[this.props.isLoading && !this.state.loading ? 'pg-btnDisabled' : 'pg-btnSuccess', 'pg-btnSm']}
              >
                {t`ورود`}
              </Button>
            </div>
            {this.props.messages.errors.length > 0 && (
              <div className={[styles.wrongVerify, styles.warn].join(' ')}>
                <IconLink icon={error} label={t`${this.props.messages.errors}`} />
              </div>
            )}
            <Link to={'/forgetpassword'} className={`pg-block pg-mt-36p pg-text-xs pg-text-gray-600 ${styles.forgetPassword}`}>
              <IconLink icon={lock} label={t`رمز عبور را فراموش کرده‌ام!`} />
            </Link>
          </form>
        </Authentication>
      )
    }
  }
}

const mapStateToProps = (state: any) => ({ isLoading: state.loading.isLoading, auth: state.auth, messages: state.messages })

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: PayloadInterface) => dispatch(login(payload)),
    setToken: (token: string) => dispatch(setToken(token)),
    setUserInfo: (payload: PayloadInterface) => dispatch(setUserCredentials(payload)),
    removeMessages: (payload: PayloadInterface) => dispatch(removeMessages(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
