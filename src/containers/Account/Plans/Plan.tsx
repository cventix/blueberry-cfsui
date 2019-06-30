import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from '../../../components/ui-elements/Button/Button'
import { t } from 'ttag'

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
  console.log(featureInfo)
  return (
    <div className={'pg-flex pg-flex-col pg-bg-white pg-w-full pg-p-8'}>
      <div className={'pg-text-blue-700 pg-text-center  '}>{product.name}</div>
      <div className={'pg-text-gray-700 pg-text-center  '}>{product.priceInfo}</div>
      <div className={'pg-text-gray-700 pg-text-center   '}>{props.monthly ? 'در ماه' : 'در سال'}</div>
      <Button className={[props.active ? 'pg-btnDisabled' : 'pg-btnSuccess0', 'pg-btnLg']}>{buttonText}</Button>
      {Object.keys(featureInfo).map((objectKey, index) => {
        let name = objectKey.split(':')[0]
        let value = objectKey.split(':')[1]
        console.log(name.match(/\d+$/))
        return (
          <div className={'pg-flex pg-justify-between'}>
            
            {index !== 1 && index !== 2 ? (
              <>
                <span>{name}</span> <span>{value? t`بله` : t`خیر`}</span>
              </>
            ) : (
              <>
                <span>{name}</span> <span>{name.match(/\d+$/)}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
