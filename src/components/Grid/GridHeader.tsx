import React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

// ui-elements
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'
import { Hr } from '../ui-elements/Hr'

//styles
import styles from './Grid.module.scss'

export interface Iprops {
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string) => void
  sortable?: boolean
  selectAll?: boolean
}

export const GridHeader: React.FunctionComponent<Iprops> = ({ onCheckAll, sortable, selectAll, onSort }) => {
  return (
    <div className={`pg-pt-26p ${styles.header}`} {...onSort && { onClick: () => onSort(t`نام`) }}>
      <div className="pg-flex pg-flex-wrap pg-items-center pg-text-gray-600 pg-mb-5p rowItem">
        <Checkbox onChange={() => onCheckAll && onCheckAll()} checked={selectAll} />
        <span className="pg-mr-10p pg-font-vMedium">{t`نام`}</span>
        {sortable && (
          <div className="pg-flex pg-flex-col pg-mt-0 pg-mb-0 pg-mr-3p pg-ml-3p pg-w-10p">
            <span className="pg-leading-6p pg-text-px">▲</span>
            <span className="pg-leading-6p pg-text-px">▼</span>
          </div>
        )}
      </div>
      <Hr />
    </div>
  )
}

const mapStateToProps = (state: any) => ({ selectAll: state.selection.selectAll })

export default connect(mapStateToProps)(GridHeader)
