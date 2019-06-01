import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'


import App from './containers/Home/App'
import Order from './components/VMContent/components/Order/Order'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'
import ForgetPassword from './containers/Authentication/Forget/ForgetPassword';
import toast from '../src/components/ui-elements/Toast/Toast'

class Routes extends React.Component<any> {
  state = {
    isAuth: false
  }
 
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/fm" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/vm" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/vm/order" component={Order} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/fm/:foldername" component={App} />
          <PrivateRoute component={App} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state: any) => ({ isAuth: state.auth.token, username: state.auth.username })

export default connect(
  mapStateToProps,
  null
)(Routes)
