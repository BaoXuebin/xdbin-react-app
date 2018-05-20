import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';

import LoginStore from '../src/mana/store/LoginStore';
import LabLayout from '../src/lab/container/LabLayout';
import LoginForm from '../src/mana/container/LoginForm';

class Login extends Component {
    static async getInitialProps({ query }) {
        const global = {
            logo: {
                name: 'cloud',
                text: '用户登录'
            },
            title: '用户登录',
            return: query.r || ''
        };
        return { global };
    }

    render() {
        return (
            <LoginForm return={this.props.global.return} />
        );
    }
}

Login.propTypes = {
    global: PropTypes.shape().isRequired
};

export default withRedux(LoginStore, null, null)(LabLayout(Login));
