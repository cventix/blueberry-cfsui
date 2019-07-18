import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'

import App from './containers/Home/App'
import Order from './components/VMContent/components/Order/Order'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'
import ForgetPassword from './containers/Authentication/Forget/ForgetPassword'
import toast from '../src/components/ui-elements/Toast/Toast'

class Routes extends React.Component<any> {
  state = {
    isAuth: false
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/nwlogin" component={Login} />
          <Route path="/nwregister" component={Register} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/nwfm/:foldername" component={App} />
          <Route path="/nwforgetpassword" component={ForgetPassword} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/nwfm" component={App} {...this.props} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/nwvms" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/nwvms/order" component={Order} />
          <Router>
            <Switch>
              <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/nwfm/preview/image/:size/:name" component={App} />
            </Switch>
          </Router>
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
