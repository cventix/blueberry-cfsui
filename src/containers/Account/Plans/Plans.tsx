import * as React from 'react'
import { connect } from 'react-redux';

const Plans: React.FunctionComponent<any> = props => {
 

  return (
   <div className={"pg-flex"}>
hi
   </div>
  )
}
const mapStateToProps = (state: any) => ({ editableForm: state.account.editableForm })

export default connect(
  mapStateToProps,
  null
)(Plans)
