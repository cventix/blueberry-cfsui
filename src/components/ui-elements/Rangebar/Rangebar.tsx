import React from 'react'

import styles from './Rangebar.module.scss'

export default interface Iprops {
  value?: string
  width?: number
  height?: number
  updateRange?: (e: string) => void
  onMouseDown?: (e: any) => void
  onMouseUp?: (e: any) => void
  max?: number
}

export const RangeBar: React.FunctionComponent<Iprops> = ({ value, width, height, updateRange, max, onMouseDown, onMouseUp }) => (
  <div className={styles.styled_range}>
    <input type="range" className={styles.track_range} style={{ width: width, height: height }} value={value} />
    <input
      type="range"
      className={styles.thumb_range}
      style={{ width: width }}
      value={value}
      max={max}
      {...updateRange && { onChange: e => updateRange(e.target.value) }}
      {...onMouseDown && { onMouseDown: e => onMouseDown(e) }}
      {...onMouseUp && { onMouseUp: e => onMouseUp(e) }}
    />
  </div>
)
