import * as React from 'react'
import { SwitchBar } from '../../components/SwitchBar/SwitchBar'
import ProfileEdit from './Profile/ProfileEdit'
import { Security } from '../../components/Security/Security'
import {
  getUserInfo,
  setProfileTab,
  changePassword,
  setFormState,
  getProducts,
  setProductToggle,
  changePlan
} from '../../services/internal/store/actions'
import { connect } from 'react-redux'
import { t } from 'ttag'
import Plans from './Plans/Plans'

export interface Iprops {
  getUserInfo: any
  changePassword: any
  setFormState: any
  editableForm: boolean
  profileView: string
  info: any
  getProducts: any
  setProductToggle: any
  monthly: any
  changePlan: any
}
export interface Istate {
  selected: string
}
class Account extends React.Component<Iprops, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      selected: 'پروفایل',
      newPassword: '',
      repeatPassword: '',
      currentPassword: ''
    }
  }
  componentDidMount = () => {
    this.props.getUserInfo()
    this.props.getProducts()
  }
  onToggle = (e: any) => {
    e.preventDefault()
    this.props.setProductToggle(!this.props.monthly)
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.info) {
      let info = nextProps.info
      this.setState({
        username: info.username,
        email: info.email,
        mobileNumber: info.mobileNumber,
        name: info.name,
        family: info.family,
        nationalId: info.profile.nationalId,
        province: info.profile.province,
        city: info.profile.city,
        postalCode: info.profile.postalCode,
        planId: info.plan.id
      })
    }
  }
  switchView = (selected: string) => {
    this.setState({ selected })
  }

  changePassword = (e: any) => {
    if (e) e.preventDefault()
    if (this.state.repeatPassword && this.state.newPassword == this.state.repeatPassword)
      this.props.changePassword(this.state.currentPassword, this.state.newPassword)
  }
  updateChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  profileChange = (e: any) => {
    if (e) e.preventDefault()
    this.props.setFormState(!this.props.editableForm)
  }
  onClick = (e: any) => {
    console.log(e.target.name)
    this.props.changePlan(e.target.name, "{ plan_type: 'MONTH', managed: false }", false)
  }
  render() {
    const options = ['پروفایل', 'پلن ها', 'امنیت']
    let profileBasic, personalInfo
    if (this.props.info) {
      profileBasic = [
        { label: 'نام کاربری', value: this.state.username, name: 'username' },
        { label: 'پست الکترونیکی', value: this.state.email, name: 'email' },
        { label: 'شماره تلفن', value: this.state.mobileNumber, name: 'mobileNumber' }
      ]
      personalInfo = [
        { label: 'نام', value: this.state.name, name: 'name' },
        { label: 'نام خانوادگی', value: this.state.family, name: 'family' },
        { label: 'کد ملی', value: this.state.nationalId, name: 'nationalId' },
        { label: 'استان', value: this.state.province, name: 'province' },
        { label: 'شهر', value: this.state.city, name: 'city' },
        { label: 'کدپستی', value: this.state.postalCode, name: 'postalCode' }
      ]
    }
    const plans = [{ name: 'رایگان' }]
    let view
    switch (this.props.profileView) {
      case t`اطلاعات کاربری`:
        view = (
          <ProfileEdit profileChange={this.profileChange} profileBasic={profileBasic} personalInfo={personalInfo} updateChange={this.updateChange} />
        )
        break
      case t`پلن`:
        view = <Plans planId={this.state.planId} onToggle={this.onToggle} onClick={this.onClick} />
        break
      case t`امنیت`:
        view = <Security changePassword={this.changePassword} updateChange={this.updateChange} />
        break
    }
    return (
      <div className={'pg-w-full'}>
        {/* <SwitchBar options={options} onSwitch={this.switchView} selected={this.state.selected} /> */}
        <div className={'pg-py-4'}> {view}</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUserInfo: () => dispatch(getUserInfo()),
    getProducts: () => dispatch(getProducts()),
    setProfileTab: (value: any) => dispatch(setProfileTab(value)),
    setProductToggle: (value: any) => dispatch(setProductToggle(value)),
    changePassword: (currentPassword: string, newPassword: string) => dispatch(changePassword(currentPassword, newPassword)),
    changePlan: (id: number, additionalInfo: string, applyNow: boolean) => dispatch(changePlan(id, additionalInfo, applyNow)),
    setFormState: (value: any) => dispatch(setFormState(value))
  }
}
const mapStateToProps = (state: any) => ({
  profileView: state.sidebar.profileTab,
  editableForm: state.account.editableForm,
  info: state.account.info,
  monthly: state.account.monthly
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
