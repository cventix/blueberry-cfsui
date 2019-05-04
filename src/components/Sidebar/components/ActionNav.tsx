import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import newFolderIcon from '../../../images/sidebarIcons/newfolder.svg'
import moveIcon from '../../../images/sidebarIcons/move.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.svg'

import  CFModal from '../../ui-elements/Modal/CreateFolder';

export default interface Iprops {
  createFolderModal?: any
  handleCFClose?: any
  showModal?: boolean
}

export const ActionNav: React.FunctionComponent<Iprops> = props => {
  const altIcon = 'Icon'
  return (
    <div className="actionNav">
      <IconLink icon={newFolderIcon} iconAlt={`new-folder ${altIcon}`} label={t`پوشه جدید`} onClick={props.createFolderModal} />
      <CFModal handleCFClose={props.handleCFClose} showModal={props.showModal}/>
      <IconLink icon={moveIcon} iconAlt={`move ${altIcon}`} label={t`انتقال`} />
      <IconLink icon={deleteIcon} iconAlt={`delete ${altIcon}`} label={t`حذف`} />
    </div>
  )
}
