import React from 'react'
import styles from '../Authentication.module.scss'

import signin from '../../../images/group.svg'
import { connect } from 'react-redux'
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login } from '../../../services/internal/store/actions'
import { Authentication } from '../Authentication'
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { Link } from 'react-router-dom'
import { Icon } from '../../../components/ui-elements/Icon'
import { Button } from '../../../components/ui-elements/Button/Button'
import loading from '../../../images/loading/tail-spin.svg'

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
        <form className={styles.box} onSubmit={this.handleSubmit}>
          <div className={styles.headertext}>ورود به حساب کاربری</div>
          <div className={styles.header}>برای استفاده از خدمات ابتدا وارد شوید</div>
          <TextInput placeholder={'نام کاربر یا ایمیل'} style={{ width: 300 }} name={'email'} onChange={this.handleChange} />
          <TextInput placeholder={'رمز عبور'} style={{ width: 300 }} name={'password'} type={'password'} onChange={this.handleChange} />
          <div className={styles.row}>
            <div>
              عضو نیستید؟
              <Link to={'/register'}>
                <span className={styles.link}>ثبت‌نام</span>
              </Link>
            </div>
            <Button className={[this.props.isLoading && !this.state.loading ? 'btnSecondary' : 'btnSuccess0', 'btnSm']}>
              {this.props.isLoading && !this.state.loading && (
                <div className={styles.buttonLoading}>
                  <Icon src={loading} />
                </div>
              )}
              ورود
            </Button>
          </div>
          <Link to={'/'}>
            <Icon src={signin} />
            <span className={styles.ltgray}> رمز عبور را فراموش کرده‌ام!</span>
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
