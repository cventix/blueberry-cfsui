import * as React from 'react'

// styles
import styles from '../CreateFolderModal/CreateFolder.module.scss'
import { TextInput } from '../../Input/Input'
import { t } from 'ttag'
import { Button } from '../../Button/Button'

export default interface Iprops {
  placeholder: string
}

export const AddDescription = (props: any) => {
  return (
    <div className={`${styles.column} pg-p-8`}>
      <h4>افزودن توضیح</h4>
      <div className={styles.socialRow} style={{ marginBottom: 15 }}>
        <textarea style={{ width: '100%' }} value={props.value} name={'description'} placeholder={'توضیحات'} onChange={props.handleChange} className={'pg-my-3 pg-p-3 pg-rounded-sm pg-border-2 pg-border-color-gray-300'} />
        <div className={'pg-flex pg-justify-end'}>
          <Button className={['pg-btnPrimary100', 'pg-btnSm']} style={{ marginRight: 10 }} onClick={props.addDescription}>{t`افزودن`}</Button>
          <Button className={['pg-btnDefault100', 'pg-btnSm']} style={{ marginRight: 10 }} onClick={()=>props.changeView('ShareLink')}>{t`رد کردن`}</Button>
        </div>
      </div>
    </div>
  )
}
