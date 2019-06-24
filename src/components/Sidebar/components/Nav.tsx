import * as React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import fileCloudIcon from '../../../images/navbarIcons/file-cloud.svg'
import internetIcon from '../../../images/navbarIcons/internet.svg'
import financeIcon from '../../../images/navbarIcons/finance.svg'
import notifIcon from '../../../images/navbarIcons/notif.svg'
import vpsIcon from '../../../images/navbarIcons/vps.svg'

export default interface Iprops {}

export const Nav: React.FunctionComponent<Iprops> = () => {
  const altIcon = 'Icon'
  return (
    <div className="pg-mt-4 pg-mb-full nav">
      <IconLink icon={fileCloudIcon} className="pg-mb-13p pg-text-gray-700 iconLink" iconAlt={`content-delivery ${altIcon}`} label={t`شبکه تحویل محتوا`} />
      <Link to={`/vm`}>
        <IconLink icon={vpsIcon} className="pg-mb-13p pg-text-gray-700 iconLink" iconAlt={`vps ${altIcon}`} label={t`سرور و هاست`} />
      </Link>
      <IconLink icon={internetIcon} className="pg-mb-13p pg-text-gray-700 iconLink" iconAlt={`Internet ${altIcon}`} label={t`اینترنت`} />
      <IconLink icon={notifIcon} className="pg-mb-13p pg-text-gray-700 iconLink" iconAlt={`notif ${altIcon}`} label={t`تیکت ها`} />
      <IconLink icon={financeIcon} className="pg-mb-13p pg-text-gray-700 iconLink" iconAlt={`finance ${altIcon}`} label={t`فاکتور ها`} />
    </div>
  )
}
