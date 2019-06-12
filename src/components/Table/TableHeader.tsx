import React, { Component } from 'react'
import { t } from 'ttag'
import { TableItem } from './TableItem'
import { IconLink } from '../ui-elements/IconLink'

//icon
import newFolderIcon from '../../images/sidebarIcons/newfolder.svg'

import styles from './Table.module.scss'

export default interface Iprops {
  titles: any
  dropdown?: boolean
  onSort?: any
  onCheckAll?: any
  checkAll?: boolean
  tabletView?: boolean
  onOpenCFModal?: any
}

export const TableHeader: React.FunctionComponent<Iprops> = ({ titles, onOpenCFModal, dropdown, onSort, onCheckAll, tabletView }) => {
  const altIcon = 'Icon'
  return (
    <thead>
      {titles && (
        <tr>
          {titles.map((label: any, i: number) => {
            if (label !== 'type' && label !== 'id' && label !== 'fullPath') {
              return (
                <TableItem
                  key={i}
                  label={label}
                  checkbox={label === t`نام` ? true : false}
                  onCheckAll={onCheckAll}
                  sortable={label !== t`مالک` && true}
                  sortType={label === t`نام` ? 'alphabet' : ' '}
                  onSort={onSort}
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
