import * as React from 'react'

interface Iprops {
  label: string
  link?: string
  index?: number
}

export const DropdownItem: React.FunctionComponent<Iprops> = ({ label, link, index }) => {
  return (
    <li>
      <a href={link}>{label} </a>
    </li>
  )
}

export default DropdownItem
