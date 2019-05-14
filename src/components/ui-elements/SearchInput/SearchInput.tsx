import * as React from 'react'

// ui-elements
import { TextInput } from '../Input/Input'
import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import { IconLink } from '../IconLink'

// icons
import searchIcon from '../../../images/search.svg'
import settingIcon from '../../../images/setting.svg'

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
    <div className={styles.searchInput}>
      <TextInput placeholder={placeHolder} onChange={(e: any) => handleInputChange(e.target.value)}/>
      <div className={styles.btnWrapper}>
        <Button>
          <Icon src={searchIcon} />
        </Button>
      </div>
      <IconLink icon={settingIcon} className={withSetting ? `${styles.setting}` : `${styles.hide}`} />
    </div>
  )
}
