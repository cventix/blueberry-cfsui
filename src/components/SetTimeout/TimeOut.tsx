import React, { Component } from 'react';

const Timeout = (Composition:any) => class _Timeout extends Component {
  timeouts: any;
    constructor(props:any) {
      super(props);
    }

    componentWillMount () {
      this.timeouts = [];
    }

    setTimeout () {
    }

    clearTimeouts () {
      this.timeouts.forEach(clearTimeout);
    }

    componentWillUnmount () {
      this.clearTimeouts();
    }

    render () {
      const { timeouts, setTimeout, clearTimeouts } = this;

      return <Composition 
        timeouts={timeouts} 
        setTimeout={setTimeout} 
        clearTimeouts={clearTimeouts} 
        { ...this.props } />
    }
}

export default Timeout;