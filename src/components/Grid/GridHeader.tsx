import React from 'react'
import { t } from 'ttag'

import { Hr } from '../ui-elements/Hr'
import { Checkbox } from '../ui-elements/Checkbox/Checkbox'

//styles
import styles from './Grid.module.scss'

export default interface Iprops {
  onCheckAll?: () => void
  onSort?: (sortBy: string, type?: string) => void
  sortable?: boolean
}

export const GridHeader: React.FunctionComponent<Iprops> = ({ onCheckAll, sortable, onSort }) => {
  return (
    <div className={styles.header} {...onSort && { onClick: () => onSort(t`نام`) }}>
      <div className={styles.title + ' rowItem'}>
        <Checkbox onChange={onCheckAll} />
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
