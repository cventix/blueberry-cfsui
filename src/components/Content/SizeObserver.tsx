import React from 'react'

export const SizeObserver = (ComposedComponent: any) =>
  class extends React.Component<any, any> {
    constructor(props: any) {
      super(props)
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }
    componentDidMount() {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
    }
    /**
     * set view according to viewport
     */
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions)
    }
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight })
    }
    render() {
      return <ComposedComponent {...this.props} {...this.state} />
    }
  }
