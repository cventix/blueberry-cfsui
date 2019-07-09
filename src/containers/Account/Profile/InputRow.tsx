import * as React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../../../services/internal/store/actions'
import { TextInput } from '../../../components/ui-elements/Input/Input'
import { SelectInput } from '../../../components/ui-elements/SelectInput/SelectInput'
import { Select } from '../../../components/ui-elements/Select/Select'
import { t } from 'ttag'

export const InputRow: React.FunctionComponent<any> = props => {
  return (
    <div className={`pg-flex pg-text-gray-700 ${props.border && ' pg-border-b-2'}`}>
      <span className={'pg-flex pg-w-1/4 pg-px-1 pg-items-center'}> {props.label}</span>
      {props.selectable ? (
        <div className={'pg-flex pg-w-full pg-justify-end'}>
          <Select onChange={props.onChange} name={props.name} optionsArray={props.optionsArray} value={props.value} />
        </div>
      ) : (
        <>
          <span className={'pg-h-12 pg-items-center pg-text-left pg-justify-end pg-flex  pg-w-3/4'}>{props.value} </span>
          <span
            className={'pg-text-blue-400 pg-text-center pg-items-center pg-mr-3 pg-flex pg-text-blue-400'}
            onClick={() => props.onEdit(props.name)}
          >
            {t`ویرایش`}
          </span>
        </>
      )}
    </div>
  )
}
