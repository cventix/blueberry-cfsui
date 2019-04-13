import * as React from 'react'

interface IProps {
  data: object
}

interface IState {
  isOpen: boolean
}

export const EnhanceDropdown = (ComposedComponent: any) =>
  class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { isOpen: false }
      this.onToggle = this.onToggle.bind(this)
      this.handleDocumentClick = this.handleDocumentClick.bind(this)
    }

    componentDidMount() {
      window.addEventListener('click', this.handleDocumentClick)
    }
    componentWillUnmount() {
      window.removeEventListener('click', this.handleDocumentClick)
    }

    handleDocumentClick() {
      if (this.state.isOpen) {
        this.onToggle()
      }
    }

    onToggle() {
      this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
      return (
        <div onClick={e => e.stopPropagation()}>
          <ComposedComponent {...this.props} onToggle={this.onToggle} isOpen={this.state.isOpen} data={this.props.data} />
        </div>
      )
    }
  }
