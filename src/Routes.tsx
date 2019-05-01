import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './containers/Home/App'
import { PrivateRoute } from './PrivateRoute'
import Login  from './components/Login/Login'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/private" component={App} />
        <Route path="/" render={props => <App {...props} />} />
      </Switch>
    </Router>
  )
}
