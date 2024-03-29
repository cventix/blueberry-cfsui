import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../ui-elements/IconLink'

// styles & icons
import profile from '../../images/profileIcons/profile.svg'
import signOut from '../../images/signout.svg'
import styles from './Signout.module.scss'
import { connect } from 'react-redux'
import { signout } from '../../services/internal/store/actions'
import { Link } from 'react-router-dom'

export interface Iprops {
  username: string
  open?: boolean
  signout?: any
}

const Signout: React.FunctionComponent<Iprops> = ({ username, open, signout }) => {
  return (
    <ul className={open ? `${styles.signout} ${styles.open}` : `${styles.signout}`}>
      <li>
        <span>{username}</span>
      </li>
      <li className={styles.item}>
        <Link to={'/nwaccount/profile'}>
          <IconLink icon={profile} iconAlt="profile" label={t`حساب کاربری`} linkStyle={{marginRight:'5px',fontSize:'12px'}} />
        </Link>
      </li>
      <li
        className={styles.item}
        onClick={() => {
          signout
          window.location.replace('/nwlogin')
        }}
      >
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
