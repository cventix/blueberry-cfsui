import React from 'react'

import styles from './Progressbar.module.scss'

export default interface Iprops {
  value: number
  error?: boolean
  width?: number
  height?: number
  color?: string
  max?: number
  direction?: any
  onChange?: any
  onMouseDown?: any
  onMouseUp?: any
}

export const Progressbar: React.FunctionComponent<Iprops> = ({ value, max = 100, error = false, direction, width, height, color, onChange ,onMouseDown,onMouseUp}) => (
  <div className={styles.progressContainer}>
    <progress
      value={value}
      max={max}
      {...onChange && { onChange: (e: any) => onChange(e) }}
      {...onMouseDown && { onMouseDown: (e: any) => onMouseDown(e) }}
      {...onMouseUp && { onMouseUp: (e: any) => onMouseUp(e) }}
      style={{ width: width, height: height, direction: direction }}
      className={color ? styles[color] : error ? styles.red : value === 100 ? styles.green : styles.yellow}
    />
  </div>
)
