import React from 'react'

// components
import { VMContentHeader } from './VMContentHeader'

// styles
import styles from './VMContent.module.scss'

export interface Iprops {
}

class VMContent extends React.Component<Iprops> {

	// handle search
	onChangeSearchInput = (val: string) => {
		console.log(val);
	}

 	public render() {
		return (
			<>
				<VMContentHeader handleSearchInput={(e: any) => this.onChangeSearchInput(e)}/>
			</>
		)
 	}
}
export default VMContent;