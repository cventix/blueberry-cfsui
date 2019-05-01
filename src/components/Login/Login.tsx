import React from 'react'
import styles from './Login.module.scss'
import { TextInput } from '../ui-elements/Input/Input'
import { Button } from '../ui-elements/Button/Button'
import { Link } from 'react-router-dom'
import { Icon } from '../ui-elements/Icon'

import signin from '../../images/group.svg'
import pg from '../../images/typeIcons/login/group-copy-2.svg'
import { connect } from 'react-redux'
import { PayloadInterface } from '../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login } from '../../services/internal/store/actions'

class Login extends React.Component<any, any> {
  state = {
    email: '',
    password: ''
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
      history.push('/')
    } catch (error) {
      console.log('E: ', error)
    }
  }
  render() {
    return (
      <div className={styles.fullpage}>
        <div className={styles.icon}>
          <Icon src={pg} />
        </div>
        <div className={styles.box}>
          <form className={styles.box} onSubmit={this.handleSubmit}>
            <div>ورود به حساب کاربری</div>
            <div className={styles.header}>برای استفاده از خدمات ابتدا وارد شوید</div>
            <TextInput placeholder={'نام کاربر یا ایمیل'} style={{ width: 300 }} name={'email'} onChange={this.handleChange} />
            <TextInput placeholder={'رمز عبور'} style={{ width: 300 }} name={'password'} type={'password'} onChange={this.handleChange} />
            <div className={styles.row}>
              <div>
                عضو نیستید؟
                <Link to={'/singup'}>
                  <span className={styles.link}>ثبت‌نام</span>
                </Link>
              </div>
              <Button className={['btnSuccess0', 'btnSm']}>ورود</Button>
            </div>
            <Link to={'/'}>
              <Icon src={signin} />
              <span className={styles.ltgray}> رمز عبور را فراموش کرده‌ام!</span>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (payload: PayloadInterface) => dispatch(login(payload)),
    setToken: (token: string) => dispatch(setToken(token)),
    setUserInfo: (payload: PayloadInterface) => dispatch(setUserCredentials(payload))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
