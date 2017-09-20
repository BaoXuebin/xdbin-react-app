import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Redirect
} from 'react-router-dom';


const isLogin = false;

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            isLogin ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            )
        )}
    />
);

AuthRoute.propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.shape()
};
AuthRoute.defaultProps = {
    location: {}
};

export default AuthRoute;
