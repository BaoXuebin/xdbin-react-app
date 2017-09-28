import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import { validate } from '../actions/GlobalAction';

class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    componentWillMount() {
        const token = this.props.token;
        if (token) {
            this.isLogin = true;
        } else {
            const localToken = localStorage.token;
            if (localToken) {
                this.props.dispatch(validate(localToken, this.props.history));
            } else {
                this.props.history.push('/login');
            }
        }
    }

    render() {
        const CustomComponent = this.props.component;
        const { token, ...rest } = this.props;
        this.isLogin = token !== null;
        return (
            this.isLogin ? (
                <CustomComponent {...rest} />
            ) : (
                <Loader active inline="centered" />
            )
        );
    }
}

AuthRoute.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    component: PropTypes.func.isRequired,
    location: PropTypes.shape(),
    token: PropTypes.string
};
AuthRoute.defaultProps = {
    location: {},
    token: null
};

function mapStateToProps(state) {
    return {
        token: state.Global.token
    };
}

export default withRouter(connect(mapStateToProps)(AuthRoute));
