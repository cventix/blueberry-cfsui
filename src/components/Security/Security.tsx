import * as React from 'react'
import ChangePassword from './ChangePassword';

export const Security: React.FunctionComponent<any> = props => {
  return (
  <ChangePassword changePassword={props.changePassword} updateChange={props.updateChange}/>
  )
}
