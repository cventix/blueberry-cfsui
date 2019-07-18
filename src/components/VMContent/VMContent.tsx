import React from 'react'
import { t } from 'ttag'

// components
import { VMContentHeader } from './components/VMContentHeader'
import { VMContentBody } from './components/VMContentBody'

// styles
import styles from './VMContent.module.scss'

export interface Iprops {
	history?: any
	location?: any
}

class VMContent extends React.Component<Iprops> {

	// handle search
	onChangeSearchInput = (val: string) => {
		//console.log(val);
	}

 	public render() {
		const history = [{ title: t`لیست سرورها`, link: '/vms', active: false }]
		if (this.props.location.pathname !== '/vms')
			history.push({ title: this.props.location.pathname.split('/'), link: this.props.location.pathname, active: true })
		return (
			<React.Fragment>
				<VMContentHeader history={history} handleSearchInput={(e: any) => this.onChangeSearchInput(e)}/>
				<VMContentBody/>
			</React.Fragment>
		)
 	}
}
export default VMContent;