import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'
import App from './containers/Home/App'
import Login from './containers/Authentication/Login/Login'
import Register from './containers/Authentication/Register/Register'

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
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/vm" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/vm/order" component={App} />
          <PrivateRoute isAuthenticated={this.props.isAuth ? true : false} path="/:foldername" component={App} />
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
