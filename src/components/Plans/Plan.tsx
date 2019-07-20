import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from '../ui-elements/Button/Button'
import { t } from 'ttag'
import { Tooltip } from '../ui-elements/Tooltip/Tooltip'
import { formatPrice } from '../../services/internal/utils/formatPrice'

export const translateName = (name: string) => {
  let translate
  if (localStorage.getItem('__language') == 'en') return name
  switch (name) {
    case 'FREE':
      translate = 'رایگان'
      break
    case 'Pro':
      translate = 'حرفه ای'
      break
    case 'Premium':
      translate = 'ویژه'
      break
  }
  return translate
}

export const Plan: React.FunctionComponent<any> = props => {
  let product = props.info
  let buttonText = t`پلن فعال است`
  if (!props.active)
    switch (product.id) {
      case 3:
        buttonText = t`ثبت پلن`
        break
      case 4:
        buttonText = t`ارتقاء به  ویژه`
        break
      case 5:
        buttonText = t`ارتقاء به حرفه‌ای`
        break
    }
  let featureInfo = JSON.parse(product.featureInfo)
  //console.log(props.monthly)
  let style
  if (props.index == 1)
    style = {
      backgroundImage: 'linear-gradient(to bottom, #ffffff, #eff4fb)'
    }
  return (
    <div className={`pg-flex pg-flex-col pg-bg-white pg-w-1/3 pg-p-8 laptop:pg-w-full mobile-max:pg-w-full tablet-max:pg-w-full `} style={style}>
      <div className={'pg-text-blue-500 pg-text-center   pg-text-base'}>{translateName(product.name)}</div>
      <div className={'pg-text-gray-900 pg-text-center pg-text-lg pg-p-2'}>
        {props.monthly
          ? product.jsonPrices
            ? formatPrice(product.jsonPrices[0].valuePrice)
            : '0'
          : product.jsonPrices
          ? formatPrice(product.jsonPrices[2].valuePrice * 0.8)
          : '0'}
      </div>
      <div className={'pg-text-gray-600 pg-text-center'}>{props.monthly ? 'در ماه' : 'در سال'}</div>
      <div className={'pg-text-gray-600 pg-text-center'}>
        <Button
          className={[props.active ? 'pg-btnDisabled' : props.disable ? 'pg-btnDisabled' : 'pg-btnSuccess0', 'pg-btnLg', 'pg-mt-4', 'pg-mb-10']}
          onClick={props.onClick}
          name={product.id}
        >
          {buttonText}
        </Button>
      </div>
      {Object.keys(featureInfo).map((objectKey, index) => {
        let array = objectKey.split(':')
        let name = array[0]
        let value = featureInfo[objectKey]
        return (
          <div
            className={`pg-flex pg-justify-between pg-p-3 pg-text-xs pg-border-dashed  pg-border-gray-300 ${index !==
              +Object.keys(featureInfo).length - 1 && 'pg-border-b-2'}`}
          >
            {index !== 1 && index !== 2 ? (
              name == 'پشتیبانی ۲۴ساعته، تمام ایام هفته' ? (
                <>
                  <span>پشتیبانی</span> <span>۲۴x۷</span>
                </>
              ) : (
                <>
                  <span>
                    {
                      name
                        .split('برای فایل‌ها')[0]
                        .split('برای همه‌ی فایلها')[0]
                        .split('نامحدود')[0]
                    }
                  </span>
                  <span>
                    {name.includes('نامحدود') ? (
                      'نامحدود'
                    ) : value && name == 'لینک مستقیم' ? (
                      <Tooltip text={value} width={90} height={27} position={'bottom'}>
                        محدودیت دارد
                      </Tooltip>
                    ) : index == 0 && +value == 1 && name == 'نمایش تبلیغات' ? (
                      'بله'
                    ) : name == 'نمایش تبلیغات' ? (
                      'خیر'
                    ) : name == 'لینک دانلود مستقیم برای همه‌ی فایلها' ? (
                      'نامحدود'
                    ) : (
                      ''
                    )}
                  </span>
                </>
              )
            ) : (
              <>
                <span> سقف آپلود{name.split('سقف آپلود')[1]}</span> <span>{name.split('سقف آپلود')[0]}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
const mapStateToProps = (state: any) => ({ monthly: state.account.monthly })
export default connect(
  mapStateToProps,
  null
)(Plan)
