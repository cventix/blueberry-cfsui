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
  changeProfile,
  setCities
} from '../../services/internal/store/actions'
import { connect } from 'react-redux'
import { t } from 'ttag'
import Plans from './Plans/Plans'
import loading from '../../images/loading/loading.gif'
import { Switch, Route } from 'react-router-dom'
import UpgradePlans from './Plans/UpgradePlans'
import iranGeography from '../../services/internal/utils/iranProvinces.json'
import RenameFile from '../../components/ui-elements/Modal/ModalContent/RenameFile'
import EditModal from '../../components/ui-elements/Modal/EditModal/EditModal'

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
  setCities: any
  cities: any
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
      changedValues: [],
      provinces: [],
      cities: [],
      input: [],
      modalView: ''
    }
  }
  componentDidMount = () => {
    if (this.props.info.length < 1) this.props.getUserInfo()
    this.props.getProducts()
    let provinces = iranGeography.map((province: any) => province.name)

    this.setState({ provinces })
  }
  onToggle = (e: any) => {
    e.preventDefault()
    this.props.setProductToggle(!this.props.monthly)
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.info && nextProps.info.profile) {
      let info = nextProps.info
      console.log(nextProps.info)
      if (this.props.cities.length < 2) this.findCities(this.findProvinceName(info.profile.province))

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

  findCities = (provinceName: any) => {
    let cities: any = []
    iranGeography.map((province: any, index: number) => {
      if (province.name == provinceName) {
        province.cities.map((city: any) => cities.push(city.name))
      }
    })
    console.log(provinceName)
    this.setState({ cities })
    console.log(this.props.cities)
    console.log(provinceName, cities)
    if (cities[0] !== this.props.cities[0]) this.props.setCities(cities)
  }
  onEdit = (modalView: string) => {
    this.setState({ modalView })
    if (modalView == 'fullName') {
      this.setState({ input: [{ name: 'name', value: this.state.name }, { name: 'family', value: this.state.family }] })
    } else if (modalView == 'location') {
      this.setState({
        input: [
          { name: 'province', value: this.state.province, selectable: true, optionsArray: this.state.provinces },
          { name: 'city', value: this.state.city, selectable: true, optionsArray: this.state.cities }
        ]
      })
    } else {
      this.setState({ input: [{ name: modalView, value: this.state[modalView] }] })
    }
  }

  findProvinceNumber = (provinceName: string) => {
    return iranGeography.findIndex(k => k.name == provinceName)
  }
  findProvinceName = (provinceNumber: string) => {
    return iranGeography[+provinceNumber].name
  }

  changePassword = (e: any) => {
    if (e) e.preventDefault()
    if (this.state.repeatPassword && this.state.newPassword == this.state.repeatPassword)
      this.props.changePassword(this.state.currentPassword, this.state.newPassword)
  }
  updateChange = (e: any) => {
    let changedValues = this.state.changedValues.concat(e.target.name)
    console.log(e.target.name)
    if (e.target.name === 'province') {
      console.log(e.target.value)
      this.findCities(e.target.value)

      this.setState({ [e.target.name]: this.findProvinceNumber(e.target.value), changedValues })
      this.setState({
        input: [
          { name: 'province', value: e.target.value, selectable: true, optionsArray: this.state.provinces },
          { name: 'city', value: this.state.city, selectable: true, optionsArray: this.props.cities }
        ]
      })
    } else if (e.target.name === 'name') {
      this.setState({ [e.target.name]: e.target.value , changedValues})
      this.setState({ input: [{ name: 'name', value: e.target.value }, { name: 'family', value: this.state.family }] })
    } else if (e.target.name === 'family') {
      this.setState({ [e.target.name]: e.target.value, changedValues })
      this.setState({ input: [{ name: 'name', value: this.state.name }, { name: 'family', value: e.target.value }] })
    } else {
      this.setState({
        input: [{ name: [e.target.name], value: e.target.value }]
      })
      console.log(e.target.value)
      this.setState({ [e.target.name]: e.target.value })
    }
  }
  profileChange = async (e: any) => {
    if (e) e.preventDefault()

    let body: any = {}

    this.state.changedValues.map((each: any, index: number) => (body[each] = this.state[this.state.changedValues[index]]))
    let result = await this.props.changeProfile(body)
    this.setState({ modalView: '' })
  }
  onClick = (e: any) => {
    console.log(e.target.name)
    this.props.changePlan(e.target.name, "{ plan_type: 'MONTH', managed: false }", false)
  }
  closeModal = () => {
    if (this.state.modalView) this.setState({ modalView: '' })
  }

  render() {
    const options = ['پروفایل', 'پلن ها', 'امنیت']

    let profileBasic: any, personalInfo: any
    if (this.props.info) {
      console.log(this.state.province)
      profileBasic = [
        { label: 'نام کاربری', value: this.state.displayName, name: 'displayName' },
        { label: 'پست الکترونیکی', value: this.state.email, name: 'email' },
        { label: 'شماره تلفن', value: this.state.mobileNumber, name: 'mobileNumber' }
      ]
      personalInfo = [
        { label: 'نام', value: this.state.name +' '+ this.state.family, name: 'fullName' },
        { label: 'کد ملی', value: this.state.nationalId, name: 'nationalId' },
        {
          label: 'موقعیت',
          value: this.state.province && this.findProvinceName(this.state.province) + ' - ' + this.state.city,
          name: 'location'
        },
        { label: 'کدپستی', value: this.state.postalCode, name: 'postalCode' }
      ]
    }
    let modal = (
      <EditModal
        handleClose={this.closeModal}
        showModal={this.state.modalView}
        profileChange={this.profileChange}
        updateChange={this.updateChange}
        input={this.state.input}
        title={'ویرایش'}
      />
    )
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
                    onEdit={this.onEdit}
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
          {modal}
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
    changeProfile: (value: any) => dispatch(changeProfile(value)),
    setCities: (value: any) => dispatch(setCities(value))
  }
}
const mapStateToProps = (state: any) => ({
  profileView: state.sidebar.profileTab,
  editableForm: state.account.editableForm,
  info: state.account.info,
  monthly: state.account.monthly,
  loading: state.loading.isLoading,
  cities: state.account.cities
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
