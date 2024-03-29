import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import { IconLink } from '../../ui-elements/IconLink'

// icons
import newFolderIcon from '../../../images/sidebarIcons/newfolder.svg'
import deleteIcon from '../../../images/sidebarIcons/delete.svg'
import moveIcon from '../../../images/sidebarIcons/move.svg'

export default interface Iprops {
  onItemClick?: any
  hide?: boolean
}

export const ActionNav: React.FunctionComponent<Iprops> = props => {
  const altIcon = 'Icon'

  return (
    <div className="actionNav">
      <IconLink icon={newFolderIcon} className="pg-mb-18p pg-mr-11p iconLink" iconAlt={`new-folder ${altIcon}`} label={t`پوشه جدید`} onClick={props.onItemClick} />
      {props.hide ? (
        ''
      ) : (
        <>
          <IconLink icon={moveIcon} className="pg-mb-18p pg-mr-11p iconLink" iconAlt={`move ${altIcon}`} label={t`انتقال`} onClick={props.onItemClick} />
          <IconLink icon={deleteIcon} className="pg-mb-18p pg-mr-11p iconLink" iconAlt={`delete ${altIcon}`} label={t`حذف`} onClick={props.onItemClick} />
        </>
      )}
    </div>
  )
}
