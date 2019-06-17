import React, { Component } from 'react'
import { t } from 'ttag'
import { TableItem } from './TableItem'
import { IconLink } from '../ui-elements/IconLink'

//icon
import newFolderIcon from '../../images/sidebarIcons/newfolder.svg'

//styles
import styles from './Table.module.scss'

export default interface Iprops {
  titles: Array<string>
  dropdown?: boolean
  checkAll?: boolean
  tabletView?: boolean
  onSort?: (sortBy: string, type?: string | undefined)  => void
  onCheckAll?: () => void
  onOpenCFModal?: () => void
}

export const TableHeader: React.FunctionComponent<Iprops> = ({ titles, onOpenCFModal, dropdown, onSort, onCheckAll, tabletView }) => {
  const altIcon = 'Icon'
  return (
    <thead>
      {titles && (
        <tr>
          {titles.map((label: string, i: number) => {
            if (label !== 'type' && label !== 'id' && label !== 'fullPath') {
              return (
                <TableItem
                  key={i}
                  label={label}
                  onCheckAll={onCheckAll}
                  onSort={onSort}
                  checkbox={label === t`نام` ? true : false}
                  sortable={label !== t`مالک` && true}
                  sortType={label === t`نام` ? 'alphabet' : ' '}
                  className={label === t`نام` ? ['header', 'show'] : ['header']}
                />
              )
            }
          })}

          {dropdown && tabletView ? (
            <td className={styles.show}>
              <IconLink className={styles.icn} icon={newFolderIcon} iconAlt={`new-folder ${altIcon}`} label={t`پوشه جدید`} onClick={onOpenCFModal} />
            </td>
          ) : (
            <td />
          )}
        </tr>
      )}
    </thead>
  )
}
