import * as React from 'react'

// styles
import styles from './Comment.module.scss'
import { Avatar } from '../ui-elements/Avatar'
import TextArea from './TextArea'
import './textarea.scss'
import { Button } from '../ui-elements/Button/Button'
import arrowLeft from '../../images/arrow-left.svg'
import { Icon } from '../ui-elements/Icon';

export class CommentInput extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: '',
      rows: 5,
      minRows: 5,
      maxRows: 10
    }
  }

  handleChange = (event: any) => {
    const textareaLineHeight = 24
    const { minRows, maxRows } = this.state

    const previousRows = event.target.rows
    event.target.rows = minRows

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

    if (currentRows === previousRows) {
      event.target.rows = currentRows
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows
      event.target.scrollTop = event.target.scrollHeight
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows
    })
  }

  render() {
    return (
      <div className={styles.commentBox}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.commentContent}>
          <textarea
            rows={this.state.rows}
            value={this.state.value}
            placeholder={'یک نظر ارسال کنید...'}
            className={`textarea ${this.state.value ? 'active' : 'notActive'} `}
            onChange={this.handleChange}
          />
          {this.state.value && (
            <Button className={['pg-btnPrimary pg-btnPrimaryOutline', 'pg-btnMd', 'pg-btnExtraRadius']} >
              ارسال
              <Icon src={arrowLeft} />
            </Button>
          )}
        </div>
      </div>
    )
  }
}
