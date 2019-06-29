import * as React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../services/internal/store/actions'
import { TextInput } from '../../../components/ui-elements/Input/Input'

export const InputRow: React.FunctionComponent<any> = props => {
  return (
    <div className={`pg-flex pg-text-gray-700 ${props.border && ' pg-border-b-2'}`}>
      <span className={'pg-flex pg-w-1/4 pg-px-1 pg-items-center'}> {props.label}</span>
      {!props.isEditable ? (
        <span className={'pg-h-12 pg-items-center pg-text-left pg-justify-end pg-flex  pg-w-3/4'}>{props.value}</span>
      ) : (
        <TextInput className={'pg-w-3/4'} value ={props.value} type={props.type} name={props.name} onChange={props.onChange} />
      )}
    </div>
  )
}
