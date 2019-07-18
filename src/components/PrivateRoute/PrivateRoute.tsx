import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  //console.log(rest)
  const routeComponent = (props: any) =>
    localStorage.getItem('token') ? React.createElement(component, props) : <Redirect to={{ pathname: '/nwlogin', state: { from: props.location } }} />
  return <Route {...rest} render={routeComponent} />
}
