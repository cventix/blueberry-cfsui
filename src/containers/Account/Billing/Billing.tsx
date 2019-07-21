import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import loading from '../../../images/loading/loading.gif'
import { getInvoices } from '../../../services/internal/store/actions'
import Table from '../../../components/Table/Table'
import { formatDate } from '../../../services/internal/utils/formatDates'
import { formatPrice } from '../../../services/internal/utils/formatPrice';

export interface Iprops {
  loading: boolean
  billing: any
  getBilling: () => void
}

export interface Istate {}
class Billing extends React.Component<Iprops, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      table:[]
    }
  }
  componentDidMount = async () => {
    console.log(this.props.billing.length)
    if (this.props.billing.length < 1) await this.props.getBilling()
  }
  makeBillingArray = (array: any) => {
    let lang = localStorage.getItem('__language')
    let table:any=[];
    array.map((each: any,index:number) => {
      table.push({
        index,
        id:each.id,
        refCode:each.refCode,
        productName:each.name,
        created_at: each.persianCreatedAt,
        payablePrice: formatPrice(each.payablePrice),
        invoiceStatus: each.invoiceStatus

      })
    })
    return table
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    if (nextProps.billing) {
     this.setState({table :this.makeBillingArray( nextProps.billing)})
    }
  }

  render() {
    const header = [t`ردیف`, t`شماره فاکتور`, t`محصول`, t`تاریخ`, t`قابل پرداخت`, t`وضعیت`]
    return (
      <div className={'pg-w-full'}>
        <Table header={header} dropdown={true} table={this.state.table}  tr={true}/>
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
  loading: state.loading.isLoading,
  billing: state.account.billing
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing)
