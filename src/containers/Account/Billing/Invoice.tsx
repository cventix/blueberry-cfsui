import React from 'react'

import { connect } from 'react-redux'
import { t } from 'ttag'
import { getInvoice } from '../../../services/internal/store/actions'
import { formatBytes } from '../../../services/internal/utils/formatBytes'
import Table from '../../../components/Table/Table'
import { formatPrice } from '../../../services/internal/utils/formatPrice'
import { Button } from '../../../components/ui-elements/Button/Button'

class Invoice extends React.Component<any, any> {
  state = {
    name: '',
    quota: '',
    persianTo: '',
    persianFrom: '',
    totalPrice: 0,
    rate: 0,
    normalPrice: 0,
    tax: 0,
    others: 0,
    paid: false,
    persianApprovedAt: '',
    off: false,
    base: 0,
    discount: 0,
    totalNoTax: 0
  }

  async componentDidMount() {
    // this.renderInvoice()
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps.invoice)
    if (nextProps.invoice) {
      this.renderInvoice(nextProps.invoice)
    }
  }
  setPrices = (title: string, each: any) => {
    switch (title) {
      case 'BASE':
        this.setState({ base: each.price })
        break
      case 'DISCOUNT':
        this.setState({ discount: each.price, totalNoTax: +this.state.base - +each.price },()=>console.log(this.state.base - +each.price))
        break

      default:
        break
    }
  }

  renderInvoice = (invoice: any) => {
    let price = invoice.invoiceItems[0].price
    invoice.invoiceItems.map((each: any) => this.setPrices(each.priceComponent.title, each))
    if (invoice.invoiceItems[1].price > invoice.invoiceItems[0].price) price = invoice.invoiceItems[1].price
    this.setState({
      name: invoice.product.name,
      quota: formatBytes({ bytes: JSON.parse(invoice.product.jsonInfo).quota }),
      persianTo: invoice.persianTo,
      persianFrom: invoice.persianFrom,
      totalPrice: invoice.totalPrice,
      totalNoTax: price,
      persianApprovedAt: invoice.persianApprovedAt,
      rate: price,
      tax: price * 0.06,
      others: price * 0.03,
      paid: invoice.paid,
      off: invoice.invoiceItems.length > 2
    })
  }

  makeBillingArray = () => {
    let table = [{ index: 1, price: 'قیمت', amount: '-', rate: formatPrice(this.state.base), normalPrice: formatPrice(this.state.base) }]
    if (this.state.off) table.push({ index: 2, price: 'تخفیف', amount: '-', rate: formatPrice(this.state.discount), normalPrice: formatPrice(this.state.discount) })
    return table
  }

  render() {
    let { name, quota, persianTo, persianFrom, paid } = this.state
    const header = [t`ردیف`, t`شرح`, t`مقدار`, t`نرخ`, t`مبلغ`]

    return (
      <tr className={'pg-w-full pg-bg-white pg-border-2 pg-border-t-0 pg-border-blue-400'}>
        <td className={'pg-w-full pg-bg-white'} colSpan={7}>
          <div className={'pg-flex pg-flex-col'}>
            <div className={'pg-flex pg-px-8 pg-py-4  pg-justify-between'}>
              <div>
                صورتحساب میزبانی فایل {name}
                {quota}
              </div>
              <div>
                <span> تاریخ شروع: {persianFrom} </span>
                <span>تاریخ پایان: {persianFrom}</span>
              </div>
            </div>
            <div className={'pg-px-20 pg-py-10'}>
              <Table header={header} sortable={false} table={this.makeBillingArray()} />
              <div className={'pg-w-full pg-flex'}>
                <div className={'pg-w-1/2'} />
                <div className={'pg-w-1/2 '}>
                  <div className={'pg-flex pg-w-full pg-py-3'}>
                    <div className={'pg-flex  pg-w-1/2'}> مجموع بدون مالیات</div>
                    <div className={'pg-flex pg-w-1/2 pg-px-6'}>{formatPrice(this.state.totalNoTax)}</div>
                  </div>
                  <div className={'pg-flex pg-w-full  pg-py-3'}>
                    <div className={'pg-flex  pg-w-1/2'}>۶ درصد مالیات</div>
                    <div className={'pg-flex pg-w-1/2 pg-px-6'}>{formatPrice(this.state.tax)}</div>
                  </div>
                  <div className={'pg-flex pg-w-full  pg-py-3'}>
                    <div className={'pg-flex  pg-w-1/2'}>۳ درصد عوارض</div>
                    <div className={'pg-flex pg-w-1/2 pg-px-6'}>{formatPrice(this.state.others)}</div>
                  </div>
                  <div />
                </div>
              </div>
              {paid && (
                <div className={'pg-w-full pg-my-4 pg-flex pg-border pg-border-green-400 pg-p-4 pg-rounded-sm pg-justify-between'}>
                  <div>
                    پرداخت شده در{this.state.persianApprovedAt} بمبلغ{formatPrice(this.state.totalPrice)}
                  </div>
                  <div>
                    <Button>چاپ</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
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
