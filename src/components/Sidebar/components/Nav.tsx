import * as React from 'react'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import fileCloudIcon from '../../../images/navbarIcons/file-cloud.svg'
import vpsIcon from '../../../images/navbarIcons/vps.svg'
import internetIcon from '../../../images/navbarIcons/internet.svg'
import notifIcon from '../../../images/navbarIcons/notif.svg'
import financeIcon from '../../../images/navbarIcons/finance.svg'

export default interface Iprops {}

export const Nav: React.FunctionComponent<Iprops> = () => {
  const altIcon = 'Icon'
  return (
    <div className="nav">
      <IconLink icon={fileCloudIcon} iconAlt={`content-delivery ${altIcon}`} label="شبکه تحویل محتوا" />
      <IconLink icon={vpsIcon} iconAlt={`vps ${altIcon}`} label="سرور و هاست" />
      <IconLink icon={internetIcon} iconAlt={`Internet ${altIcon}`} label="اینترنت" />
      <IconLink icon={notifIcon} iconAlt={`notif ${altIcon}`} label="تیکت‌ها" />
      <IconLink icon={financeIcon} iconAlt={`finance ${altIcon}`} label="فاکتورها" />
    </div>
  )
}
