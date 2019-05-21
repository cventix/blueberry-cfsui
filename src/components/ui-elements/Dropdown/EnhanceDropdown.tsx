import * as React from 'react'
import ReactDOM from 'react-dom';

interface IProps {
  data: any
  width?: number
  onSelect?: (option: number) => void
  optionSelected?: number
  position?: any
  id?: number
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
      this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount() {
      window.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('click', this.handleClickOutside, true);
    }
    componentWillUnmount() {
      window.removeEventListener('click', this.handleDocumentClick)
      document.removeEventListener('click', this.handleClickOutside, true);
    }
    handleClickOutside = (event:any) => {
      const domNode = ReactDOM.findDOMNode(this);
  
      if (!domNode || !domNode.contains(event.target)) {
        this.setState({ isOpen: false })
      }
  }
    handleDocumentClick() {
      if (this.state.isOpen) {
        this.onToggle()
      }
    }

    onToggle() {
      this.setState({ isOpen: !this.state.isOpen })
    }

    onSelect(option: number) {
      if (this.props.onSelect) this.props.onSelect(option)
    }

    render() {
      return (
        <div onClick={e => e.stopPropagation()}>
          <ComposedComponent
            {...this.props}
            onToggle={this.onToggle}
            isOpen={this.state.isOpen}
            id={this.props.id}
            selectable={false}
            data={this.props.data}
            isSelected={this.props.optionSelected}
            onSelect={this.onSelect}
          />
        </div>
      )
    }
  }
