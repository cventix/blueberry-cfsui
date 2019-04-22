import * as React from 'react'
import { t } from 'ttag'

// ui-elements
import Toggle from '../../../ui-elements/Toggle/Toggle'

// styles
import styles from './FileFiltering.module.scss'

export default interface Iprops {

}

export const FileFiltering = ({}: Iprops) => {
	return (
		<div className={styles.fileFiltering}>
			<div className={styles.option}>
				<Toggle className="toggle-sm" checked={false} />
				<span className={styles.text}>{t`به اشتراک گذاشته‌ شده‌ها`}</span>
			</div>
			<div className={styles.option}>
				<Toggle className="toggle-sm"  checked={true} />
				<span className={styles.text}>{t`نمایش حذف شده‌ها`}</span>
			</div>
		</div>
	)
}
