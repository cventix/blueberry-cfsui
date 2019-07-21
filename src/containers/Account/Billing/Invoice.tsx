import React from 'react'

import { connect } from 'react-redux'
import { t } from 'ttag'
import { getInvoice } from '../../../services/internal/store/actions'

class Invoice extends React.Component<any, any> {
  state = {}

  async componentDidMount() {
    getInvoice(this.props.id)
    console.log(this.props.invoice)
  }
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.invoice.length > 0) {
      console.log(nextProps.invoice)
    }
  }

  render() {
    return (
      <div className={'pg-w-full'}>
        <div className={'pg-flex pg-justify-around'} />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  invoice: state.account.invoice
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    getInvoice: (value: any) => dispatch(getInvoice(value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice)
