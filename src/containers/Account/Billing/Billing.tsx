import * as React from 'react'
import { connect } from 'react-redux'
import { t } from 'ttag'

import loading from '../../../images/loading/loading.gif'
import { getInvoices } from '../../../services/internal/store/actions'
import Table from '../../../components/Table/Table'
import { formatDate } from '../../../services/internal/utils/formatDates'
import { formatPrice } from '../../../services/internal/utils/formatPrice'
import { Button } from '../../../components/ui-elements/Button/Button'
import PayModal from '../../../components/ui-elements/Modal/PayModal/PayModal'

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
      table: [],
      showModal: false
    }
  }
  componentDidMount = async () => {
    console.log(this.props.billing.length)
    if (this.props.billing.length < 1) await this.props.getBilling()
  }
  pay = () => {
    this.setState({ showModal: true })
  }
  makeBillingArray = (array: any) => {
    let lang = localStorage.getItem('__language')
    let table: any = []
    array.map((each: any, index: number) => {
      table.push({
        index: +index + 1,
        id: each.id,
        refCode: each.refCode,
        productName: each.name,
        created_at: each.persianCreatedAt,
        payablePrice: formatPrice(each.payablePrice),
        invoiceStatus: each.invoiceStatus ? this.renderStatusButton(each.invoiceStatus) : this.renderStatusButton(each.paid ? 'PAID' : 'DRAFT')
      })
    })
    return table
  }
  renderStatusButton = (status: string) => {
    let button
    switch (status) {
      case 'DRAFT':
        button = <Button onClick={this.pay} className={['pg-btnMd', 'pg-btnPrimary', 'pg-btnCircle', 'pg-rounded-full']}>{`پرداخت کنید`}</Button>
        break
      case 'PAID':
        button = <Button className={['pg-btnMd', 'pg-btnSuccess pg-btnSuccessOutline', 'pg-btnCircle', 'pg-rounded-full']}>{`پرداخت شده`}</Button>
        break
      case 'CANCEL':
        button = <Button className={['pg-btnMd', 'pg-btnDanger pg-btnDangerOutline', 'pg-btnCircle', 'pg-rounded-full']}>{`لغو شده`}</Button>
        break
    }
    return button
  }
  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps)
    if (nextProps.billing) {
      this.setState({ table: this.makeBillingArray(nextProps.billing) })
    }
  }
  handleClose = () => {
    //console.log('dasd')
    this.setState({ showModal: false, modalView: '' })
  }
  render() {
    const header = [t`ردیف`, t`شماره فاکتور`, t`محصول`, t`تاریخ`, t`قابل پرداخت`, t`وضعیت`]
    return (
      <div className={'pg-w-full'}>
        <Table header={header} dropdown={true} table={this.state.table} tr={true} />
        <PayModal showModal={this.state.showModal} handleCFClose={this.handleClose} />
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
