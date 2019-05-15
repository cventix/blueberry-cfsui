import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import Toggle from '../../../ui-elements/Toggle/Toggle'

// styles
import styles from './FileFiltering.module.scss'

export default interface Iprops {
	forFM?: boolean
	forVM?: boolean
}

export const FileFiltering = ({ forFM, forVM }: Iprops) => {
	return (
		<div className={styles.fileFiltering}>
			<div className={forFM ? styles.option : `hide`}>
				<Toggle checked={false} />
				<span className={styles.text}>{t`به اشتراک گذاشته‌ شده‌ها`}</span>
			</div>
			<div className={forFM ? styles.option : `hide`}>
				<Toggle checked={true}/>
				<span className={styles.text}>{t`نمایش حذف شده‌ها`}</span>
			</div>
			<div className={forVM ? styles.option : `hide`} >
				<Toggle checked={false}/>
				<span className={styles.text}>{t`نمایش سرورهای فعال`}</span>
			</div>
		</div>
	)
}
