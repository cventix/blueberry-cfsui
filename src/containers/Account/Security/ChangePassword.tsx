import * as React from 'react'
import { connect } from 'react-redux'
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { InputRow } from '../Profile/InputRow'
import { t } from 'ttag'
import { Button } from '../../../components/ui-elements/Button/Button'

const ChangePassword: React.FunctionComponent<any> = props => {
  return (
    <form onSubmit={props.changePassword} className={'pg-w-1/2 laptop:pg-w-3/4 tablet:pg-w-3/4  mobile-max:pg-w-full'}>
      <h1 className={'pg-text-lg pg-py-5 pg-text-gray-700'}> تغییر رمز</h1>
      <InputRow label={t`رمز عبور  فعلی`} type={'password'} name={'oldPassword'} isEditable={true} onChange={props.updateChange} />
      <InputRow label={t`رمز عبور جدید`} type={'password'} name={'newPassword'} isEditable={true} onChange={props.updateChange} />
      <InputRow label={t`تایید رمز عبور جدید`} name={'repeatPassword'} type={'password'} isEditable={true} onChange={props.updateChange} />
      <Button className={['pg-btnPrimary0', 'pg-btnSm']}>{t`ثبت`}</Button>
    </form>
  )
}
const mapStateToProps = (state: any) => ({ info: state.auth.info })

export default connect(
  mapStateToProps,
  null
)(ChangePassword)
