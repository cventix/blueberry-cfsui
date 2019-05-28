import * as React from 'react'

export default class TextArea extends React.PureComponent<any, any> {
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
      <textarea
        rows={this.state.rows}
        value={this.state.value}
        placeholder={'Enter your text here...'}
        className={`textarea `}
        onChange={this.handleChange}
      />
    )
  }
}
