import * as React from 'react'
import { connect } from 'react-redux'
import { InputRow } from '../Profile/InputRow'
import { Progressbar } from '../ui-elements/Progressbar/Progressbar'
import { formatBytes } from '../../services/internal/utils/formatBytes'
import { translateName } from './Plan'
import { Button } from '../ui-elements/Button/Button'
import { Link } from 'react-router-dom'
import { t } from 'ttag'

export interface Iprops {
  info?: any
}

const renderColor = (percent: any) => {
  let color
  if (percent < 70) color = 'green'
  else if (percent > 70 && percent < 85) color = 'yellow'
  else color = 'red'
  return color
}

const Plans: React.FunctionComponent<Iprops> = ({ info }) => {
  let faname, percent, faTime, expireDate
  if (info && info.plan && JSON.parse(info.plan.jsonInfo)) {
    console.log(JSON.parse(info.plan.jsonInfo).name)
    if (info.plan.featureInfo)
      faname =
        localStorage.getItem('__language') == 'en'
          ? JSON.parse(info.plan.featureInfo).en_description
          : JSON.parse(info.plan.featureInfo).fa_description
    else faname = translateName(info.plan.name)

    faTime =
      localStorage.getItem('__language') == 'en'
        ? JSON.parse(info.plan.jsonInfo).plan_type
        : JSON.parse(info.plan.jsonInfo).plan_type === 'MONTH'
        ? `ماهانه`
        : `سالانه`
    percent = info && info.plan && +(info.quota / JSON.parse(info.plan.jsonInfo).quota).toFixed(2)
  }
  if (info && info.lastPaidInvoice) expireDate = info.lastPaidInvoice.persianTo

  return (
    <div className={'pg-w-1/2 laptop:pg-w-3/4 tablet:pg-w-3/4  mobile-max:pg-w-full'}>
      <h1 className={'pg-text-lg pg-py-5 pg-text-gray-700'}>{t`پلن فعال`}</h1>
      {/* <InputRow label={'نام طرح '} value={`${faname} - ${faTime}`} border={true} editable={false} /> */}
      <div className={`pg-flex pg-text-gray-700 pg-w-full pg-flex-col pg-py-4 pg-border-b-2`}>
        <div className={`pg-flex pg-justify-between pg-items-center`}>
          <div>
            {faname} - {faTime}
          </div>

          <Link to={'/account/plans/upgrade'}>
            <Button className={['pg-btnPrimary0', 'pg-btnMd', 'pg-my-4']} style={{ height: '35px' }}>{t`ارتقای حساب`}</Button>
          </Link>
        </div>
      </div>
      <div className={`pg-flex pg-text-gray-700 pg-w-full pg-flex-col pg-py-4 pg-border-b-2`}>
        <div className={`pg-flex pg-justify-between pg-my-2`}>
          <div>{t`فضای پرشده`} </div>
          <div>
            {formatBytes({ bytes: info.quota, lang: localStorage.getItem('__language') })} {t`از`}{' '}
            {formatBytes({ bytes: info.plan && JSON.parse(info.plan.jsonInfo).quota, lang: localStorage.getItem('__language') })}
          </div>
        </div>
        <Progressbar value={percent ? percent : 0.9} height={28} width={'100%'} color={renderColor(percent)} />
      </div>
      {expireDate && <InputRow label={t`تاریخ اتمام طرح`} value={expireDate} border={true} editable={false} />}
      <div className={'pg-flex pg-justify-end'} />
    </div>
  )
}
const mapStateToProps = (state: any) => ({ info: state.account.info })

export default connect(
  mapStateToProps,
  null
)(Plans)
