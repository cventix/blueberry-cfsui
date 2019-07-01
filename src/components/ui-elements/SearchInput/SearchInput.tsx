import * as React from 'react'

// ui-elements
import { SuggestionBox } from './SuggestionBox';
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'
import { IconLink } from '../IconLink'
import { Icon } from '../Icon'

// icons
import settingIcon from '../../../images/setting.svg'
import searchIcon from '../../../images/search.svg'

// styles
import styles from './SearchInput.module.scss'

// interface
export default interface Iprops {
  withSetting?: boolean
  placeHolder: string
  handleInputChange: (e: any) => void
}

export const SearchInput = ({ withSetting = false, placeHolder, handleInputChange }: Iprops) => {
  return (
    <div className={`pg-relative pg-flex pg-flex-row pg-flex-wrap pg-justify-end pg-items-center ${styles.searchInput}`}>
      <TextInput placeholder={placeHolder} onChange={(e: any) => handleInputChange(e.target.value)} />
      <div className={`pg-relative flex-center pg-flex-col pg-flex-wrap ${styles.btnWrapper}`}>
        <Button style={{ backgroundColor: '#fff' }}>
          <Icon src={searchIcon} />
        </Button>
      </div>
      <IconLink icon={settingIcon} className={withSetting ? `flex-center pg-h-35p pg-cursor-pointer pg-border-solid pg-z-10 pg-text-center pg-w-36p ${styles.setting}` : `${styles.hide}`} />
    </div>
  )
}

