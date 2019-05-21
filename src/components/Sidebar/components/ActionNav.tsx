import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import newFolderIcon from '../../../images/sidebarIcons/newfolder.svg'
import moveIcon from '../../../images/sidebarIcons/move.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.svg'

export default interface Iprops {
  onItemClick?: any
  hide?: boolean
}

export const ActionNav: React.FunctionComponent<Iprops> = props => {
  const altIcon = 'Icon'

  return (
    <div className="actionNav">
      <IconLink icon={newFolderIcon} iconAlt={`new-folder ${altIcon}`} label={t`پوشه جدید`} onClick={props.onItemClick} />
      {props.hide ? (
        ''
      ) : (
        <>
          <IconLink icon={moveIcon} iconAlt={`move ${altIcon}`} label={t`انتقال`} onClick={props.onItemClick} />
          <IconLink icon={deleteIcon} iconAlt={`delete ${altIcon}`} label={t`حذف`} onClick={props.onItemClick} />
        </>
      )}
    </div>
  )
}
