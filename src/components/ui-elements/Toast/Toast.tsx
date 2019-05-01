import * as React from 'react'

// styles
import styles from './Toast.module.scss'

export default interface Iprops {
  level?: string
  width?: number
  visible?: boolean
  message?: string
}

export class Toast extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render() {
    let classes = `${styles.toast} ${this.props.level && styles[this.props.level]} `
    classes += this.state.visible ? `${styles.visible}` : ''
    console.log()
    return (this.props.message && (
      <div className={classes} style={{ width: this.props.width }}>
        <p>{this.props.message}</p>
      </div>
    ))
  }

  componentWillReceiveProps(nextProps: Iprops) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }
}
