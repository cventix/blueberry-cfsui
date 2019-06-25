import * as React from 'react'

// styles
import styles from './Button.module.scss'
import { Icon } from '../Icon'

import loadingIcon from '../../../images/loading/tail-spin.svg'

export default interface Iprops {
  className?: string[]
  onClick?: (e: React.SyntheticEvent) => void
  style?: object
  children?: any
  disabled?: boolean
  loading?: boolean
  extraClassName?: any[]
}

const classCreator = (className: any, extraClassName?: any) => {
  let cls = className.map((name: any) => name).join(' ')
    return [cls, extraClassName && extraClassName.join(' ')].join(' ')
}

export const Button = ({ className, onClick, style, children, loading, extraClassName, disabled }: Iprops) => {
  return (
    <button
      disabled={disabled}
      className={className ? `pg-btn ${classCreator(className, extraClassName)}` : `pg-btn`}
      onClick={e => onClick && onClick(e)}
      style={style}
    >
      {loading ? (
        <div className={styles.buttonLoading}>
          <Icon src={loadingIcon} />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
