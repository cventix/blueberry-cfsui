import React, { FunctionComponent } from 'react'
import { t } from 'ttag'

// ui-elements
import { Stepbar } from '../../../../../components/Stepbar/Stepbar'

export default interface Iprops {}

const steps = [t`انتخاب سیستم عامل`, t`انتخاب مدت سرویس`, t`انتخاب طرح`, t`اطلاعات کارت شبکه`, t`انتخاب نام سرور و ثبت نهایی`];

export const ServiceDuration: React.FunctionComponent<Iprops> = () => { 
	return (
		<Stepbar steps={steps} currentStep={1} />
	)
}
