import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  console.log(isAuthenticated)
  const routeComponent = (props: any) =>
    localStorage.getItem('token') && isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  return <Route {...rest} render={routeComponent} />
}
