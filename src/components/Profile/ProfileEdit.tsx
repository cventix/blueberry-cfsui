import * as React from 'react'
import { connect } from 'react-redux'

import { InputRow } from './InputRow'



const ProfileEdit: React.FunctionComponent<any> = props => {
  let { profileBasic, personalInfo } = props
  console.log(personalInfo)
  return (
    <>
      <form onSubmit={props.profileChange}>
        <h1 className={'pg-text-lg pg-py-5 pg-text-gray-700'}> اکانت شخصی</h1>
        <div className={'pg-py-3 pg-bg-gray-400 pg-text-gray-700 pg-px-1'}>مشخصات اصلی</div>
        {profileBasic &&
          profileBasic.map((each: any) => {
            return (
              <InputRow
                label={each.label}
                value={each.value}
                editable={true}
                border={true}
                onEdit={props.onEdit}
                onChange={props.updateChange}
                name={each.name}
                
              />
            )
          })}
        <div className={'pg-py-3 pg-bg-gray-400 pg-text-gray-700 pg-px-1'}>مشخصات فردی</div>
        {personalInfo &&
          personalInfo.map((each: any) => {
            return (
              <InputRow
                label={each.label}
                editable={true}
                value={each.value}
                onEdit={props.onEdit}
                border={true}
                onChange={props.updateChange}
                name={each.name}
                {...each.optionsArray && { optionsArray: each.optionsArray }}
                selectable={each.selectable}
              />
            )
          })}
        {/* <div>
          <Button className={['pg-btnPrimary0', 'pg-btnSm', 'pg-my-3']}>{t`ویرایش`}</Button>
          <Button className={['pg-btnDefault0', 'pg-btnSm', 'pg-my-3','pg-mx-3']}>{t`انصراف`}</Button>
        </div> */}
      </form>
    </>
  )
}
const mapStateToProps = (state: any) => ({ editableForm: state.account.editableForm })

export default connect(
  mapStateToProps,
  null
)(ProfileEdit)
