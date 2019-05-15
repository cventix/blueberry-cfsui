import * as React from 'react'

// ui-elements
import { Icon } from './Icon'
import { Signout } from '../Signout/Signout'

// icon
import avatarIcon from '../../images/navbarIcons/avatar.svg'

export default interface Iprops {
  toggleSignout: () => void
  profileImg?: string
  alt?: string
  open: boolean
}

export const Avatar = ({ profileImg, alt, toggleSignout, open }: Iprops) => {
	return (
		<div onClick={e => {e.preventDefault(); toggleSignout()}}>
			<Icon src={profileImg ? profileImg : avatarIcon} 
				alt="Avatar Image" 
				className="avatar" 
			/>
			<Signout username="آرزو علی پناه" open={open}/>
		</div>
	)
}

