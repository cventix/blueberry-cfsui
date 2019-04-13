import * as React from "react";

interface MyProps {
  optionSelected: string;
  data: object;
  onSelect: (e: string) => void;
}

interface MyState {
  isOpen: boolean;
}

export const EnhanceDropdown = (ComposedComponent: any) =>
  class extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
      super(props);
      this.state = { isOpen: false };
      this.onToggle = this.onToggle.bind(this);
      this.handleDocumentClick = this.handleDocumentClick.bind(this);
      this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
      window.addEventListener("click", this.handleDocumentClick);
    }
    componentWillUnmount() {
      window.removeEventListener("click", this.handleDocumentClick);
    }

    handleDocumentClick() {
      if (this.state.isOpen) {
        this.onToggle();
      }
    }

    onToggle() {
      this.setState({ isOpen: !this.state.isOpen });
    }

    onSelect(option: any) {
      this.onToggle();
      if (this.props.onSelect) this.props.onSelect(option);
    }
    
    render() {
      return (
        <div onClick={e => e.stopPropagation()}>
          <ComposedComponent
            {...this.props}
            onToggle={this.onToggle}
            onSelect={this.onSelect}
            isOpen={this.state.isOpen}
            optionSelected={this.props.optionSelected}
            data={this.props.data}
          />
        </div>
      );
    }
  };
