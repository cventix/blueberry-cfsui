import React from 'react'
import styles from '../Authentication.module.scss'

import signin from '../../../images/group.svg'
import { connect } from 'react-redux'
import { PayloadInterface } from '../../../services/internal/store/reducers/authReducer'
import { setUserCredentials, setToken, login, register } from '../../../services/internal/store/actions'
import { Authentication } from '../Authentication'

import { Link } from 'react-router-dom'
import { Icon } from '../../ui-elements/Icon'
import { Button } from '../../ui-elements/Button/Button'
import { TextInput } from '../../ui-elements/Input/Input'

class Register extends React.Component<any, any> {
  state = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  }
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = async (e: any) => {
    const { history } = this.props
    if (e) e.preventDefault()
    try {
      await this.props.register(this.state.email, this.state.username,  this.state.password )
      
    } catch (error) {
      console.log('E: ', error)
    }
  }
  render() {
    return (
      <Authentication>
        <form className={styles.box} onSubmit={this.handleSubmit} style={{ height: 465 }}>
          <div className={styles.headertext}>ثبت‌نام کاربر جدید</div>
          <div className={styles.header}>برای استفاده از خدمات ابتدا ثبت‌نام شوید</div>
          <TextInput placeholder={'نام کاربری'} style={{ width: 300 }} name={'username'} onChange={this.handleChange} />
          <TextInput placeholder={'ایمیل'} style={{ width: 300 }} name={'email'} onChange={this.handleChange} />
          <TextInput placeholder={'رمز عبور'} style={{ width: 300 }} name={'password'} type={'password'} onChange={this.handleChange} />
          <TextInput placeholder={'تکرار رمز عبور'} style={{ width: 300 }} name={'passwordRepeat'} type={'password'} onChange={this.handleChange} />
          <div className={styles.row}>
            <div>
              عضو هستید؟
              <Link to={'/login'}>
                <span className={styles.link}>ورود</span>
              </Link>
            </div>
            <Button className={['btnPrimary0', 'btnSm']}>ثبت‌نام</Button>
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (email: string, username: string, password: String) => dispatch(register(email, username, password))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)
