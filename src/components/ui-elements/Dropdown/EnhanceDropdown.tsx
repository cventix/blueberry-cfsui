import * as React from 'react'
import ReactDOM from 'react-dom'

interface IProps {
  data: any
  width?: number
  marginLeft?: number
  onSelect?: (option: number) => void
  optionSelected?: number
  position?: any
  id?: number
  fileType?: string
  noButton?: boolean
  bordered?: boolean
  isOpen?: boolean
  buttonDropDown?: boolean
  selectable?: boolean
  alwaysOpen?: boolean
}

interface IState {
  isOpen: boolean
}

export const EnhanceDropdown = (ComposedComponent: any) =>
  class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      this.state = { isOpen: props.isOpen ? props.isOpen : false }
      this.onToggle = this.onToggle.bind(this)
      this.handleDocumentClick = this.handleDocumentClick.bind(this)
      this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount() {
      window.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('click', this.handleClickOutside, true)
    }
    componentWillUnmount() {
      window.removeEventListener('click', this.handleDocumentClick)
     document.removeEventListener('click', this.handleClickOutside, true)
    }
    handleClickOutside = (event: any) => {
      const domNode = ReactDOM.findDOMNode(this)
      if (!domNode || !domNode.contains(event.target)) {
        this.setState({ isOpen:  false  })
      }
    }
    handleDocumentClick() {
      if (this.state.isOpen && this.props.alwaysOpen) {
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
            fileType={this.props.fileType}
            isOpen={this.state.isOpen}
            noButton={this.props.noButton}
            buttonDropDown={this.props.buttonDropDown}
            id={this.props.id}
            selectable={this.props.selectable}
            data={this.props.data}
            bordered={this.props.bordered}
            isSelected={this.props.optionSelected}
            onSelect={this.onSelect}
          />
        </div>
      )
    }
  }
