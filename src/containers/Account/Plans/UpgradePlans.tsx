import * as React from 'react'
import { connect } from 'react-redux'
import  Plan  from './Plan'
import Toggle from '../../../components/ui-elements/Toggle/Toggle'
import greenArrow from '../../../images/typeIcons/group.svg'
import { Icon } from '../../../components/ui-elements/Icon'
const UpgradePlans: React.FunctionComponent<any> = props => {
  let products = [
    {
      category: 'CFS',
      featureActive: true,
      featureInfo:
        '{"نمایش تبلیغات": true,"۵۰۰ مگابایت سقف آپلود هر فایل": true,"۵۰ مگابایت سقف آپلود از URL": true,"لینک مستقیم: عکس، swf, js, html, css": true}',
      id: 3,
      jsonInfo:
        '{"quota": 8589934592,"maximumSize": 524288000,"urlMaximumSize": 52428800,"bandwidth": 21474836480,"faname": "رایگان","plan_type": "MONTH"}',
      name: 'FREE',
      priceInfo: 0.0,
      productActive: true,
      required: true,
      staticPlan: false
    },
    {
      category: 'CFS',
      featureActive: true,
      featureInfo:
        '{"نمایش تبلیغات": false,"۲ گیگابایت سقف آپلود هر فایل": true,"۲ گیگابایت سقف آپلود از URL": true,"لینک دانلود مستقیم برای همه\u200cی فایلها": true,"سرعت دانلود و ترافیک نامحدود برای فایل\u200cها": true,"تضمین ماندگاری همیشگی همه\u200cی فایل\u200cها": true}',
      id: 4,
      jsonInfo: '{"quota": 21474836480,"maximumSize": 2147483648,"urlMaximumSize": 2147483648,"bandwidth": 0,"faname" : "PG","plan_type": "MONTH"}',
      jsonPrices: [
        {
          calculationType: 'FIXED',
          quantityBreakId: 4,
          recuringPeriod: 'MONTH',
          title: 'BASE',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'FIXED',
          valuePrice: 20.0
        },
        {
          calculationType: 'FIXED',
          quantityBreakId: 65,
          recuringPeriod: 'YEAR',
          title: 'DISCOUNT',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'PERCENT',
          valuePrice: 20.0
        },
        {
          calculationType: 'FIXED',
          discountPrice: 30.0,
          quantityBreakId: 64,
          recuringPeriod: 'YEAR',
          title: 'BASE',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'FIXED',
          valuePrice: 150.0
        }
      ],
      name: 'Pro',
      priceInfo: 4.0,
      productActive: true,
      required: true,
      staticPlan: false
    },
    {
      category: 'CFS',
      featureActive: true,
      featureInfo:
        '{"نمایش تبلیغات": false,"۱۰ گیگابایت سقف آپلود هر فایل": true,"۱۰ گیگابایت سقف آپلود از URL": true,"لینک دانلود مستقیم برای همه\u200cی فایلها": true,"سرعت دانلود و ترافیک نامحدود برای فایل\u200cها": true,"تضمین ماندگاری همیشگی همه\u200cی فایل\u200cها": true,"پشتیبانی ۲۴ساعته، تمام ایام هفته": true}',
      id: 5,
      jsonInfo:
        '{"quota": 107374182400,"maximumSize": 10737418240,"urlMaximumSize": 10737418240,"bandwidth": 0,"faname" : "PG+","plan_type": "MONTH"}',
      jsonPrices: [
        {
          calculationType: 'FIXED',
          quantityBreakId: 8,
          recuringPeriod: 'MONTH',
          title: 'BASE',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'FIXED',
          valuePrice: 40.0
        },
        {
          calculationType: 'FIXED',
          quantityBreakId: 68,
          recuringPeriod: 'YEAR',
          title: 'DISCOUNT',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'PERCENT',
          valuePrice: 20.0
        },
        {
          calculationType: 'FIXED',
          discountPrice: 60.0,
          quantityBreakId: 67,
          recuringPeriod: 'YEAR',
          title: 'BASE',
          validFrom: 1389299400000,
          validTo: 1608409800000,
          valueApplication: 'FIXED',
          valuePrice: 300.0
        }
      ],
      name: 'Premium',
      priceInfo: 35.0,
      productActive: true,
      required: true,
      staticPlan: false
    }
  ]
 
  return (
    <div className={'pg-flex pg-w-full pg-flex-col tablet-max:pg-p-12 mobile-max:pg-p-8'}>
      <div className={'pg-flex pg-w-full pg-justify-center '}>
        <div className={'pg-flex pg-bg-white pg-justify-center pg-relative'}>
          <div className={`pg-text-center pg-p-4 pg-px-10 pg-bg-activated-900`}>شخصی</div>
          <div className={'pg-text-center pg-p-4 pg-px-10 '}>سازمانی</div>
        </div>
      </div>
      <div className={'pg-flex  pg-w-full pg-bg-white  pg-p-10 pg-justify-center t'}>
        <span className={`pg-px-3 pg-py-1`}>ماهیانه</span>
        <span onClick={(e) => props.onToggle(e)}>
          <Toggle checked={props.monthly} className={'bigToggle'} />
        </span>
        <span className={`pg-px-3 pg-py-1`}>سالانه</span>
        <span className={`pg-relative`}>
          <Icon src={greenArrow} style={{ positon: 'absolute', top: '-4px' }} />
        </span>
        <span className={`pg-px-3 pg-py-1 pg-text-xs pg-text-green-400`}>٪۲۰ تخفیف</span>
      </div>
      <div className={'pg-flex pg-w-full laptop:pg-flex-col mobile-max:pg-flex-col tablet-max:pg-flex-col '}>
        {products && products.map((plan: any, index: number) => <Plan info={plan} active={props.planId == plan.id} index={index} onClick={props.onClick} />)}
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({ products: state.account.products ,monthly: state.account.monthly })

export default connect(
  mapStateToProps,
  null
)(UpgradePlans)
