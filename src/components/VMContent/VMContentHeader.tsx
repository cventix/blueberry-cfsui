import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { Alert } from '../ui-elements/Alert/Alert'
import { Caption } from '../ui-elements/Caption'
import { SearchInput } from '../ui-elements/SearchInput/SearchInput'
import { Card } from '../VMGrid/Card/Card'

//styles
import styles from './VMContent.module.scss'

export default interface Iprops {
  handleSearchInput: (e: string) => void
}

export const VMContentHeader: React.FunctionComponent<Iprops> = ({ handleSearchInput }) => {
  return (
    <div className={styles.header}>
      <Caption label="لیست سرورها"/>
      <Alert className={['red', 'sm']} width={326} message="برای اعمال ارتقاء ، باید سرور را خاموش کنید"/>
      <SearchInput placeHolder={t`جستجو`} withSetting={true} handleInputChange={(e: string) => handleSearchInput(e)}/>
      <Card />
    </div>
  )
}
