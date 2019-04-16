import * as React from 'react'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import newFolderIcon from '../../../images/sidebarIcons/newfolder.svg'
import moveIcon from '../../../images/sidebarIcons/move.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.svg'

export default interface Iprops {}

export const ActionNav: React.FunctionComponent<Iprops> = () => {
  const altIcon = 'Icon'
  return (
    <div className="actionNav">
      <IconLink icon={newFolderIcon} iconAlt={`new-folder ${altIcon}`} label="پوشه جدید" />
      <IconLink icon={moveIcon} iconAlt={`move ${altIcon}`} label="انتقال" />
      <IconLink icon={deleteIcon} iconAlt={`delete ${altIcon}`} label="حذف" />
    </div>
  )
}
