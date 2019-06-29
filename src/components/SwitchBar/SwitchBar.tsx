import * as React from 'react'

export const SwitchBar: React.FunctionComponent<any> = props => {
  return (
    <ul className="pg-flex pg-flex-row pg-flex-wrap right">
      {props.options.map((label: string) => (
        <li className={props.selected== label ?"pg-flex-1 pg-p-3 pg-border-gray-900 pg-border-b-2 pg-text-center pg-cursor-default" :"pg-flex-1 pg-p-3 pg-text-gray-600 pg-text-center pg-border-gray-500  pg-border-b-2 pg-cursor-pointer"} onClick={() => props.onSwitch(label)}>
          {label}
        </li>
      ))}
    </ul>
  )
}
