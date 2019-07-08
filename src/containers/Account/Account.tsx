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
  changePlan,
  changeProfile
} from '../../services/internal/store/actions'
import { connect } from 'react-redux'
import { t } from 'ttag'
import Plans from './Plans/Plans'
import loading from '../../images/loading/loading.gif'
import { Switch, Route } from 'react-router-dom'
import UpgradePlans from './Plans/UpgradePlans'

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
  changeProfile: any
  loading: boolean
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
      currentPassword: '',
      changedValues: []
    }
  }
  componentDidMount = () => {
    if (this.props.info.length < 1) this.props.getUserInfo()
    this.props.getProducts()
  }
  onToggle = (e: any) => {
    e.preventDefault()
    this.props.setProductToggle(!this.props.monthly)
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.info && nextProps.info.profile) {
      let info = nextProps.info
      this.setState({
        displayName: info.displayName,
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
    } else if (nextProps.info) {
      let info = nextProps.info
      this.setState({
        displayName: info.displayName,
        email: info.email,
        mobileNumber: info.mobileNumber,
        name: info.name,
        family: info.family
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
    let changedValues = this.state.changedValues.concat(e.target.name)
    this.setState({ [e.target.name]: e.target.value, changedValues })
  }
  profileChange = async (e: any) => {
    if (e) e.preventDefault()
    this.props.setFormState(!this.props.editableForm)
    let body: any = {}
    if (this.props.editableForm) {
      this.state.changedValues.map((each: any, index: number) => (body[each] = this.state[this.state.changedValues[index]]))
      let result = await this.props.changeProfile(body)
    }
  }
  onClick = (e: any) => {
    console.log(e.target.name)
    this.props.changePlan(e.target.name, "{ plan_type: 'MONTH', managed: false }", false)
  }
  render() {
    const options = ['پروفایل', 'پلن ها', 'امنیت']
    let profileBasic: any, personalInfo: any
    if (this.props.info) {
      profileBasic = [
        { label: 'نام کاربری', value: this.state.displayName, name: 'displayName' },
        { label: 'پست الکترونیکی', value: this.state.email, name: 'email' },
        { label: 'شماره تلفن', value: this.state.mobileNumber, name: 'mobileNumber' }
      ]
      personalInfo = [
        { label: 'نام', value: this.state.name, name: 'name' },
        { label: 'نام خانوادگی', value: this.state.family, name: 'family' },
        { label: 'کد ملی', value: this.state.nationalId, name: 'nationalId' },
        { label: 'استان', value: this.state.province, name: 'province', selectable: true },
        { label: 'شهر', value: this.state.city, name: 'city', selectable: true },
        { label: 'کدپستی', value: this.state.postalCode, name: 'postalCode' }
      ]
    }

    return (
      <div className={'pg-w-full'}>
        <div className={'pg-py-4'}>
          {this.props.loading ? (
            <div className={'pg-w-full pg-my-10 pg-flex pg-justify-center pg-items-center'}>
              <img src={loading} />
            </div>
          ) : (
            <Switch>
              <Route
                path={`/account/profile`}
                render={() => (
                  <ProfileEdit
                    profileChange={this.profileChange}
                    profileBasic={profileBasic}
                    personalInfo={personalInfo}
                    updateChange={this.updateChange}
                  />
                )}
              />

              <Route
                path={`/account/plans/upgrade`}
                render={() => <UpgradePlans planId={this.state.planId} onToggle={this.onToggle} onClick={this.onClick} />}
              />
              <Route path={`/account/plans`} render={() => <Plans />} />
              <Route
                path={`/account/changePassword`}
                render={() => <Security changePassword={this.changePassword} updateChange={this.updateChange} />}
              />
            </Switch>
          )}
        </div>
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
    setFormState: (value: any) => dispatch(setFormState(value)),
    changeProfile: (value: any) => dispatch(changeProfile(value))
  }
}
const mapStateToProps = (state: any) => ({
  profileView: state.sidebar.profileTab,
  editableForm: state.account.editableForm,
  info: state.account.info,
  monthly: state.account.monthly,
  loading: state.loading.isLoading
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
