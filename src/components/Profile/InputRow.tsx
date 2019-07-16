import * as React from 'react'
import { t } from 'ttag'

import { Select } from '../ui-elements/Select/Select'


export interface Iprops {
  border: boolean
  selectable?: boolean
  name?: string 
  label: string
  onChange?: any
  editable: boolean
  onEdit?: any
  value: any
  optionsArray?: any

}

export const InputRow: React.FunctionComponent<Iprops> = props => {
  return (
    <div className={`pg-flex pg-text-gray-700 ${props.border && ' pg-border-b-2'}`}>
      <span className={'pg-flex pg-w-1/4 pg-px-1 pg-items-center'}> {props.label}</span>
      {props.selectable ? (
        <div className={'pg-flex pg-w-full pg-justify-end'}>
          <Select onChange={props.onChange} name={props.name && props.name} optionsArray={props.optionsArray} value={props.value} />
        </div>
      ) : (
        <>
          <span className={'pg-h-12 pg-items-center pg-text-left pg-justify-end pg-flex  pg-w-3/4'}>{props.value} </span>
          {props.editable && (
            <span
              className={'pg-text-blue-400 pg-text-center pg-items-center pg-mr-3 pg-flex pg-text-blue-400 pg-cursor-pointer'}
              onClick={() => props.onEdit(props.name, props.label)}
            >
              {t`ویرایش`}
            </span>
          )}
        </>
      )}
    </div>
  )
}
