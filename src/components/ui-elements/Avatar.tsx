import * as React from 'react'

// ui-elements
import { Icon } from './Icon'
import { Signout } from './Signout/Signout'

// icon
import avatarIcon from '../../images/navbarIcons/avatar.svg'

export default interface Iprops {
  profileImg?: string
  alt?: string
}

export const Avatar = ({ profileImg, alt }: Iprops) => {
	return (
		<div style={{ position: 'relative' }}>
			<Icon src={profileImg ? profileImg : avatarIcon} alt="Avatar Image" className="avatar" />
			<Signout username="آرزو علی پناه" />
		</div>
	)
}

