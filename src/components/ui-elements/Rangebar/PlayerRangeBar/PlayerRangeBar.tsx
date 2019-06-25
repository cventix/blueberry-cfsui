import React from 'react'

import './PlayerRangeBar.scss'

export default interface Iprops {
  value?: string | number
  width?: number
  height?: number
  updateRange?: any
  color?: string
  onMouseDown?: (e: any) => void
  onMouseUp?: (e: any) => void
  max?: number
  step?: number
}

export const PlayerRangeBar: React.FunctionComponent<Iprops> = ({
  value,
  width= '100%',
  height,
  updateRange,
  max,
  onMouseDown,
  onMouseUp,
  color,
  step = 1
}) => (
  <input
    id="range"
    type="range"
    value={value}
    min="0"
    max={max}
    step={step}
    onChange={updateRange}
    className={color}
    style={{ width: width, height: height }}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
  />
)
