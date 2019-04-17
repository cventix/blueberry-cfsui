// TODO: when hover blue outline

import * as React from 'react'
import Select from 'react-select'

import style from './SelectInput.module.scss'

export default interface Iprops {
  options: any[]
  onChange?: () => void
  selected?: object
  placeholder: string
  isMulti?: boolean
}

const styles = {
  option: () => ({
    padding: '5px 10px',
    fontFamily: 'vazir-regular',
    fontSize: 12,
    color: '#737373',
  }),

  multiValueRemove: () => ({
    color: '#9b9b9b',
    backgroundColor: '#f1f2f3',
    display: 'inline-block',
    position: 'absolute' as 'absolute',
    top: 4,
    left: 1,
    height: 14,
  }),

  multiValueLabel: () => ({
    color: '#737373',
    display: 'inline-block',
    marginLeft: 12,
  }),

  multiValue: () => ({
    marginLeft: 4,
    marginBottom: 2,
    padding: '2.5px 6px',
    border: 'solid 1px #e5e7e9',
    backgroundColor: '#f1f2f3',
    borderRadius: 1,
    position: 'relative' as 'relative',
  }),

  container: () => ({
    display: 'block',
    fontFamily: 'vazir-regular',
    fontSize: 12,
    width: 200,
  }),

  menu: () => ({
    marginTop: 13,
    background: '#fff',
    boxSshadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
    border: 'solid 1px #4b9cfd',
    borderRadius: 3,
  }),

  input: () => ({
    padding: '2px 4px',
  }),
}

export const SelectInput = ({ options, onChange, selected, placeholder, isMulti }: Iprops) => (
  <Select
    options={options}
    styles={styles}
    className={style.selectInput}
    onChange={onChange}
    value={selected}
    placeholder={placeholder}
    noOptionsMessage={() => 'آیتمی وجود ندارد'}
    {...isMulti && { isMulti: isMulti }}
  />
)
