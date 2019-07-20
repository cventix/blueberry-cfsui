import React, { Component } from 'react'
import { t } from 'ttag'

// ui-elements
import { Button } from '../../../../components/ui-elements/Button/Button'
import { TextInput } from '../../../../components/ui-elements/Input/Input'
import { IconLink } from '../../../../components/ui-elements/IconLink'
import { Caption } from '../../../../components/ui-elements/Caption'

// internal components
import { VMContentHeader } from '../VMContentHeader'

// icons & styles
import addCreditIcon from '../../../../images/addCredit.svg'
import styles from './GiftCard.module.scss'

export default class GiftCard extends React.Component<any, any> {
	// handle search
    onChangeSearchInput = (val: string) => {
        //console.log(val);
    }

    render() {
		const history = [{ title: t`لیست سرورها`, link: '/vms', active: false }]
			if (this.props.location.pathname !== '/vms')
				history.push({ title: this.props.location.pathname.split('/'), link: this.props.location.pathname, active: true })
      
		return (
			<div className={styles.giftCard}>
				<VMContentHeader history={history} handleSearchInput={(e: any) => this.onChangeSearchInput(e)}/>
				<div className={styles.addCredit}>
					<span className={styles.faModeTxt}>میزان اعتبار جاری شما <span className={styles.price}>۳۴۰,۰۰۰ ریال </span>می‌باشد.</span>
					<span className={styles.enModeTxt}>Your Current Credit Score is: <span className={styles.price}>۳۴۰,۰۰۰ R</span></span>
					<Button className={['btnDefault0', 'btnLg']}>
						<IconLink icon={addCreditIcon} label={t`افزودن اعتبار`}/>
					</Button>
				</div>
				<Caption label={t`برای افزایش اعتبار مبلغ مورد نظر را (به ریال) وارد کنید:`}/>
				<div className={styles.payment}>
					<TextInput placeholder={`120,000`}/>
					<Button className={['btnPrimary0', 'btnSm']}>{t`پرداخت`}</Button>
				</div>
			</div>
		)
	}
}

