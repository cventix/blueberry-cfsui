import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import { InputRow } from '../Profile/InputRow';
import { Button } from '../ui-elements/Button/Button';
import { TextInput } from '../ui-elements/Input/Input';


export interface Iprops {
  changePassword?: any
  updateChange?: any
}
const ChangePassword: React.FunctionComponent<Iprops> = props => {
  return (
    <form onSubmit={props.changePassword} className={'pg-w-1/2 laptop:pg-w-3/4 tablet:pg-w-3/4  mobile-max:pg-w-full'}>
      <h1 className={'pg-text-lg pg-py-5 pg-text-gray-700'}> تغییر رمز</h1>
      <TextInput label={t`رمز عبور  فعلی`} type={'password'} name={'oldPassword'} onChange={props.updateChange} />
      <TextInput label={t`رمز عبور جدید`} type={'password'} name={'newPassword'}  onChange={props.updateChange} />
      <TextInput label={t`تایید رمز عبور جدید`} name={'repeatPassword'} type={'password'}  onChange={props.updateChange} />
      <Button className={['pg-btnPrimary0', 'pg-btnSm']}>{t`ثبت`}</Button>
    </form>
  )
}
const mapStateToProps = (state: any) => ({ info: state.auth.info })

export default connect(
  mapStateToProps,
  null
)(ChangePassword)
