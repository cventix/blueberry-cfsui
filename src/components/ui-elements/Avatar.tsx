import * as React from 'react'

// ui-elements
import { Icon } from './Icon'
import Signout from '../Signout/Signout'

// icon
import avatarIcon from '../../images/navbarIcons/avatar.svg'

export default interface Iprops {
  toggleSignout?: () => void
  profileImg?: string
  alt?: string
  open?: boolean
}

export const Avatar = ({ profileImg, alt, toggleSignout, open }: Iprops) => {
  return (
    <div
      {...toggleSignout && {
        onClick: e => {
          e.preventDefault()
          toggleSignout()
        }
      }}
      className="pg-flex pg-items-center pg-cursor-pointer"
    >
      <Icon src={profileImg ? profileImg : avatarIcon} alt="Avatar Image"
      className="pg-rounded-full tablet-max:pg-w-34p tablet-max:pg-h-34p" width={30}/>
      <Signout username="آرزو علی پناه" open={open} />
    </div>
  )
}
