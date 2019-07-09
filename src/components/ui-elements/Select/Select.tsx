import React from 'react'

export default interface Iprops {
  optionsArray: any
  value: string
  onChange: any
  name: string
}

export const Select: React.FunctionComponent<Iprops> = ({ optionsArray, value, onChange, name }) => {
  console.log(optionsArray)
  const options = optionsArray.map((elem: any) => <option value={elem}>{elem}</option>)
  return (
    <select value={value} onChange={onChange} name={name} className={'pg-w-full  pg-h-35p pg-my-2 pg-border-gray-400 pg-border  pg-bg-white'}>
      {options}
    </select>
  )
}
