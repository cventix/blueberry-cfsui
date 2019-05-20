import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { Alert } from '../../ui-elements/Alert/Alert'
import { Breadcrumb, BreadcrumbItem } from '../../ui-elements/Breadcrumb/Breadcrumb'
import { SearchInput } from '../../ui-elements/SearchInput/SearchInput'

//styles
import styles from '../VMContent.module.scss';


export default interface Iprops {
  handleSearchInput: (e: string) => void
  history: BreadcrumbItem[]
}

export const VMContentHeader: React.FunctionComponent<Iprops> = ({ history, handleSearchInput }) => {
  return (
    <div className={styles.header}>
      <Breadcrumb history={history} />
      <Alert className={['red', 'sm']} width={326} message="برای اعمال ارتقاء ، باید سرور را خاموش کنید"/>
      <SearchInput placeHolder={t`جستجو`} withSetting={true} handleInputChange={(e: string) => handleSearchInput(e)}/>
    </div>
  )
}
