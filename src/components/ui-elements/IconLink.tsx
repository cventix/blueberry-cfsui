import * as React from 'react'

// ui-elements
import { Icon } from './Icon'

export default interface Iprops {
  className?: string
  icon: string
  iconAlt?: string
  label?: string
  to?: string
  onClick?: any
}

export const IconLink: React.FunctionComponent<Iprops> = ({ className = 'iconLink', icon, iconAlt, label, onClick }: Iprops) => {
  return (
    <div className={className} {...onClick && { onClick: label ? () => onClick(label) : onClick() }}>
      <Icon src={icon} alt={iconAlt} />
      <span style={{margin: '0 2px'}}>{label}</span>
    </div>
  )
}
