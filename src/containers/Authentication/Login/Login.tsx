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
import { setUserCredentials, setToken, login } from '../../../services/internal/store/actions'

// icons & styles
import loading from '../../../images/loading/tail-spin.svg'
import lock from '../../../images/typeIcons/login/lock.svg'
import styles from '../Authentication.module.scss'

class Login extends React.Component<any, any> {
  state = {
    email: '',
    password: '',
    loading: false
  }
  
  handleChange = (e: any) => {
    console.log(e.target)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e: any) => {
    const { history } = this.props
    console.log(this.state.email)
    if (e) e.preventDefault()
    try {
      await this.props.login({ email: this.state.email, password: this.state.password })
      setTimeout(() => history.push('/'), 3000)
    } catch (error) {
      console.log('E: ', error)
    }
  }

  componentDidMount() {}

  render() {
    return (
      <Authentication>
        <form className={styles.login} onSubmit={this.handleSubmit}>
          <span className={styles.title}>{t`ورود به حساب کاربری`}</span>
          <p className={styles.description}>{t`برای استفاده از خدمات ابتدا وارد شوید`}</p>
          <TextInput placeholder={t`نام کاربر یا ایمیل`} name={'email'} onChange={this.handleChange} />
          <TextInput placeholder={t`رمز عبور`} name={'password'} type={'password'} onChange={this.handleChange} />
          <div className={styles.row}>
            <div className={styles.switch}>
              {t`عضو نیستید؟`}
              <Link to={'/register'}>
                <span className={styles.link}>{t`ثبت‌نام`}</span>
              </Link>
            </div>
            <Button className={[this.props.isLoading && !this.state.loading ? 'btnSecondary' : 'btnSuccess0', 'btnSm']}>
              {this.props.isLoading && !this.state.loading && (
                <div className={styles.buttonLoading}>
                  <Icon src={loading} />
                </div>
              )}
              {t`ورود`}
            </Button>
          </div>
          <Link to={'/'} className={styles.forgetPassword}>
            <IconLink icon={lock} label={t`رمز عبور را فراموش کرده‌ام!`}/>
          </Link>
        </form>
      </Authentication>
    )
  }
}

const mapStateToProps = (state: any) => ({ isLoading: state.loading.isLoading })

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: PayloadInterface) => dispatch(login(payload)),
    setToken: (token: string) => dispatch(setToken(token)),
    setUserInfo: (payload: PayloadInterface) => dispatch(setUserCredentials(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
