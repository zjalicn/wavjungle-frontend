import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Private route renders a route only if the user is logged in
//otherwise redirects user to login page

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        //localStorage.getItem('user') ?
         <Component {...props} />
        //: <Redirect to={{pathname: '/login-register', state: { from: props.location } }} />
    )} />
)