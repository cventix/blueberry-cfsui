import * as React from 'react'
import Timeout from '../../SetTimeout/TimeOut'
// styles
import styles from './Toast.module.scss'

export interface Iprops {
  level?: string
  width?: number
  visible?: boolean
  message?: string
  caret?: boolean
}

class Toast extends React.Component<Iprops, any> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      visible: false
    }
  }
  componentWillReceiveProps(nextProps: Iprops) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        visible: nextProps.visible
      })
    }
  }

  render() {
    let classes = `${styles.toast} ${this.props.level && styles[this.props.level]} `
    classes += this.state.visible ? `${styles.visible}` : ''
    console.log()
    return (
      this.props.children && (
        <div className={classes} style={{ width: this.props.width }}>
          <div className={styles.row}>{this.props.children}</div>
        </div>
      )
    )
  }
}

export default Toast
