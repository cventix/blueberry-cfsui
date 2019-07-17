import React, { Component, useState } from 'react'
import { t } from 'ttag'
import TableItem from './TableItem'
import { IconLink } from '../ui-elements/IconLink'

//icon
import newFolderIcon from '../../images/sidebarIcons/newfolder.svg'

//styles
import styles from './Table.module.scss'
import { connect } from 'react-redux'

export interface Iprops {
  titles: Array<string>
  dropdown?: boolean
  checkAll?: boolean
  tabletView?: boolean
  selectAll?: boolean
  onSort?: (sortBy: string, type?: string | undefined) => void
  onCheckAll?: () => void
  onOpenCFModal?: () => void
}

const TableHeader: React.FunctionComponent<Iprops> = ({ titles, onOpenCFModal, dropdown, onSort, selectAll, onCheckAll, tabletView }) => {
  const altIcon = 'Icon'
  const [hovered, setHovered] = useState(false)
  const toggleHover = () => setHovered(!hovered)
  console.log(selectAll)
  return (
    <thead>
      {titles && (
        <tr onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          {titles.map((label: string, i: number) => {
            if (label !== 'type' && label !== 'id' && label !== 'fullPath') {
              return (
                <TableItem
                  key={i}
                  label={label}
                  onCheckAll={onCheckAll}
                  onSort={onSort}
                  hovered={hovered && hovered}
                  checked={selectAll}
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
const mapStateToProps = (state: any) => ({ selectAll: state.selection.selectAll })

export default connect(mapStateToProps)(TableHeader)
