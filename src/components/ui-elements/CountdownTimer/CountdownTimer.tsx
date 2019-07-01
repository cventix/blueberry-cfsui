import React from 'react'

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
    return <div className='flex-center pg-ml-10p pg-text-10p pg-w-23p pg-h-23p pg-rounded-full' style={{border: '1px solid #8dff46'
}}>
    {this.state.timeRemainingInSeconds}</div>
  }
}



