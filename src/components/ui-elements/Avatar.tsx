import * as React from 'react'

// ui-elements
import { Icon } from './Icon'

// icon
import avatarIcon from '../../images/navbarIcons/avatar.svg'

export default interface Iprops {
  profileImg?: string
  alt?: string
}

export const Avatar = ({ profileImg, alt }: Iprops) => <Icon src={profileImg ? profileImg : avatarIcon} alt="Avatar Image" className="avatar" />
