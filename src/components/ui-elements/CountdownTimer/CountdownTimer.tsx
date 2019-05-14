import React from 'react'
//styles
import styles from './CountdownTimer.module.scss';

export interface IProps {
  startTimeInSeconds: number
}

export interface IState {
  timeRemainingInSeconds: number
}
export class CountdownTimer extends React.Component<IProps, IState> {
  private timer: any

  constructor(props: IProps) {
    super(props)
    this.state = {
      timeRemainingInSeconds: props.startTimeInSeconds
    }
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInSeconds > 0) {
      this.setState({
        timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
      })
    } else {
      clearInterval(this.timer!)
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining()
    }, 1000)
  }

  render() {
    return <div className={styles.counter}>
    {this.state.timeRemainingInSeconds}</div>
  }
}
