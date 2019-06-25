import * as React from 'react'

// ui-elements
import { Icon } from './Icon'

export default interface Iprops {
  className?: string
  icon: string
  iconAlt?: string
  iconWidth?: number
  iconHeight?: number
  label?: string
  linkStyle?: object
  to?: string
  onClick?: any
}

export const IconLink: React.FunctionComponent<Iprops> = ({ className = 'iconLink', icon, iconAlt, iconWidth, iconHeight, label, linkStyle, onClick }: Iprops) => {
  return (
    <div className={className} {...onClick && { onClick: label ? () => onClick(label) : onClick() }}>
      <Icon src={icon} alt={iconAlt} width={iconWidth} height={iconHeight}/>
      <span style={linkStyle}>{label}</span>
    </div>
  )
}
