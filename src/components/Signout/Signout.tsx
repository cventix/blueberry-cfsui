import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../ui-elements/IconLink'

// services
import { signout } from '../../services/internal/store/actions'

// styles & icons
import profile from '../../images/profileIcons/profile.svg'
import signOut from '../../images/signout.svg'
import styles from './Signout.module.scss'

export interface Iprops {
  username: string
  open?: boolean
  signout?: any
}

const Signout: React.FunctionComponent<Iprops> = ({ username, open, signout }) => {
  return (
    <ul className={open ? `${styles.signout} ${styles.open}` : styles.signout}>
      <li className='pg-pt-8p pg-pb-8p pg-pr-15p pg-pl-15p'>
        <span>{username}</span>
      </li>
      <li className='pg-pt-8p pg-pb-8p pg-pr-15p pg-pl-15p ${styles.item}'>
        <IconLink icon={profile} iconAlt="profile" label={t`حساب کاربری`}/>
      </li>
      <li className='pg-pt-8p pg-pb-8p pg-pr-15p pg-pl-15p' onClick={()=>{ signout; window.location.replace('/login')} }>
        <IconLink icon={signOut} iconAlt="logout" label={t`خروج`} />
      </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    signout: () => dispatch(signout())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Signout)
