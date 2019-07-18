import React, { FunctionComponent } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

// ui-elements
import { VMGrid } from '../../VMGrid/VMGrid'
import Order from '../../VMContent/components/Order/Order'

export default interface Iprops {}

export const VMContentBody: React.FunctionComponent<Iprops> = () => { 
	return(
		<React.Fragment>
			<Router>
				<Switch>
					<Route
						path="/vms/order"
						component={Order}
					/>
					<Route
						 path="/vms"
						component={VMGrid}
					/>
				</Switch>
			</Router>
		</React.Fragment>
	)
}
