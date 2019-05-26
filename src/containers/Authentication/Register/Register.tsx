import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { t } from 'ttag'
import { Authentication } from '../Authentication'

// ui-elements
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { Button } from '../../../components/ui-elements/Button/Button'
import { Icon } from '../../../components/ui-elements/Icon'
import { IconLink } from '../../../components/ui-elements/IconLink'

// services
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login, register } from '../../../services/internal/store/actions'

// icons & styles
import error from '../../../images/error.svg'
import styles from '../Authentication.module.scss'

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
    error: ''
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
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)) {
      this.setState({ error: `ایمیل صحیح نمی باشد` })
    }
    if (!/^(?=.{5,45}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(this.state.username)) {
      this.setState({
        error: ` نام کاربری باید بین ۵ تا ۴۵ حرف باشد، با عدد شروع نشود و تنها شامل حروف انگلیسی و اعداد باشد.`
      })
    }
  }
  handleSubmit = async (e: any) => {
    const { history } = this.props
    if (e) e.preventDefault()
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
    if (!this.state.error)
      try {
        await this.props.register(this.state.email, this.state.username, this.state.password)
      } catch (error) {
        console.log('E: ', error)
      }
  }

  render() {
    return (
      <Authentication>
        <form onSubmit={this.handleSubmit}>
          <span className={styles.title}>{t`ثبت‌نام کاربر جدید`}</span>
          <p className={styles.description}>{t`برای استفاده از خدمات ابتدا ثبت‌نام شوید`}</p>
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
          <div className={styles.row}>
            <div className={styles.switch}>
              {t`عضو هستید؟`}
              <Link to={'/login'}>
                <span className={styles.link}>{t`ورود`}</span>
              </Link>
            </div>
            <Button className={['btnPrimary0', 'btnSm']}>{t`ثبت‌نام`}</Button>
          </div>
          {this.state.error && (
            <div className={styles.wrongVerify}>
              <IconLink icon={error} label={t`${this.state.error}`} />
            </div>
          )}
        </form>
      </Authentication>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (email: string, username: string, password: String) => dispatch(register(email, username, password))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
