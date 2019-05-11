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

export const IconLink = ({ className = 'iconLink', icon, iconAlt, label, onClick }: Iprops) => (
  <div className={className} onClick={onClick} >
    <Icon src={icon} alt={iconAlt} />
    <span>{label}</span>
  </div>
)
