import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import loading from '../../images/loading/loading.gif'
import { getInvoices } from '../../services/internal/store/actions'
import Table from '../../components/Table/Table'

export interface Iprops {
  loading: boolean
  getBilling: () => void
}

export interface Istate {}
class Billing extends React.Component<Iprops, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    this.props.getBilling()
  }

  render() {
    const header = [t`ردیف`, t`شماره فاکتور`, t`محصول`, t`تاریخ`, t`قابل پرداخت`, t`وضعیت`]
    return this.props.loading ? (
      <div className={'pg-w-full  pg-min-h-screen pg-flex pg-justify-center pg-items-center'}>
        <img style={{ width: '50px', marginBottom: '30%' }} src={loading} />
      </div>
    ) : (
      <div className={'pg-w-full'}>
        <Table header={header} dropdown={true} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getBilling: () => dispatch(getInvoices())
  }
}
const mapStateToProps = (state: any) => ({
  loading: state.loading.isLoading
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
