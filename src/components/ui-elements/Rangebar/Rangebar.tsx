import React from 'react'
import styles from './Rangebar.module.scss'

export default interface Iprops {
  value?: string
  width?: number
  updateRange?: (e: string) => void
}

export const RangeBar: React.FunctionComponent<Iprops> = ({ value, width, updateRange }) => (
  <div className={styles.styled_range}>
    <input type="range" className={styles.track_range} style={{ width: width }} value={value} />
    <input
      type="range"
      className={styles.thumb_range}
      style={{ width: width }}
      defaultValue={value}
      {...updateRange && { onChange: e => updateRange(e.target.value) }}
    />
  </div>
)
