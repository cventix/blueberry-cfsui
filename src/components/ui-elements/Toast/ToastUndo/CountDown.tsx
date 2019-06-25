import React from 'react'
import styles from './ToastUndo.module.scss'
export class CircularProgressBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    const sqSize = this.props.sqSize
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - (dashArray * (this.props.percentage * 10)) / 100

    return (
      <svg width={this.props.sqSize} height={this.props.sqSize} viewBox={viewBox}>
        <circle
          className={styles.CircleBackground}
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          className={styles.circleProgress}
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12
          transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
        />
        <text className={styles.circleText} x="50%" y="50%" dy=".3em" textAnchor="middle">
          {`${this.props.percentage}`}
        </text>
      </svg>
    )
  }
}
