import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './containers/Home/App'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" render={props => <App {...props} />} />
        <Route path="/:folderName" component={App} />
      </Switch>
    </Router>
  )
}
