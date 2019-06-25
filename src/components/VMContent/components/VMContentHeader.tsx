import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { Breadcrumb, BreadcrumbItem } from '../../ui-elements/Breadcrumb/Breadcrumb'
import { ColorfulBox } from '../../ui-elements/ColorfulBox/ColorfulBox'
import { SearchInput } from '../../ui-elements/SearchInput/SearchInput'

//styles
import styles from '../VMContent.module.scss';


export default interface Iprops {
  handleSearchInput: (e: string) => void
  history: any
  className?: string
}

export const VMContentHeader: React.FunctionComponent<Iprops> = ({ history, handleSearchInput, className }) => {
  return (
    <div className={`${styles.header} ${className}`}>
      <Breadcrumb history={history} className={styles.cstBread}/>
      <ColorfulBox className={['red', 'sm']} width={326} message="برای اعمال ارتقاء ، باید سرور را خاموش کنید" hide={true}/>
      <SearchInput placeHolder={t`جستجو`} withSetting={true} handleInputChange={(e: string) => handleSearchInput(e)}/>
    </div>
  )
}
