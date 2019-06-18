import React from 'react'
import { t } from 'ttag'

import { Hr } from '../ui-elements/Hr'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

//styles
import styles from './Grid.module.scss'
import { connect } from 'react-redux'

export interface Iprops {
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string) => void
  sortable?: boolean
  selectAll?: boolean
}

export const GridHeader: React.FunctionComponent<Iprops> = ({ onCheckAll, sortable, selectAll, onSort }) => {
  return (
    <div className={styles.header} {...onSort && { onClick: () => onSort(t`نام`) }}>
      <div className={styles.title + ' rowItem'}>
        <Checkbox onChange={() => onCheckAll && onCheckAll()} checked={selectAll} />
        <span className={styles.label}>{t`نام`}</span>
        {sortable && (
          <div className={styles.sort}>
            <span>▲</span>
            <span>▼</span>
          </div>
        )}
      </div>
      <Hr />
    </div>
  )
}

const mapStateToProps = (state: any) => ({ selectAll: state.selection.selectAll })

export default connect(mapStateToProps)(GridHeader)
