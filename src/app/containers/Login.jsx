import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Label } from 'semantic-ui-react';
import {
    withRouter,
    Redirect
} from 'react-router-dom';

import { loginIfNeeded, loginError, removeError } from '../actions/LoginAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.params = {
            r: '/manager'
        };
    }

    componentWillMount() {
        const { location } = this.props;
        const search = location.search;
        const query = search.split(/[?&]/);
        let kv = [];
        if (query) {
            query.forEach((q) => {
                kv = q.split('=');
                if (kv && kv.length === 2) {
                    this.params[kv[0]] = kv[1];
                }
            });
        }
    }

    handleLogin() {
        const username = this.username.inputRef.value;
        const password = this.password.inputRef.value;
        if (username && password) {
            this.props.dispatch(loginIfNeeded({
                username,
                password
            }));
        } else {
            this.props.dispatch(loginError('用户名或密码不能为空'));
        }
    }

    handleFocus() {
        this.props.dispatch(removeError());
    }

    render() {
        const { token } = this.props;
        if (token === null) {
            const { loading, error } = this.props;
            return (
                <div style={{ width: '260px', margin: '12% auto', marginBottom: '25%', textAlign: 'center' }}>
                    <Input
                        icon="users"
                        iconPosition="left"
                        placeholder="这里输入用户名"
                        fluid
                        error={error != null}
                        ref={(username) => { this.username = username; }}
                        onFocus={this.handleFocus}
                    /><br />
                    <Input
                        type="password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="这里输入密码"
                        fluid
                        error={error !== null}
                        ref={(password) => { this.password = password; }}
                        onFocus={this.handleFocus}
                    /><br />
                    <br />
                    <Button loading={loading} disabled={loading} color="green" content="登录" fluid style={{ marginBottom: '5px' }} onClick={this.handleLogin} />
                    <br />
                    {error !== null &&
                        <Label basic color="red">{error}</Label>
                    }
                </div>
            );
        }
        return (
            <Redirect to={this.params.r} />
        );
    }
}

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string,
    location: PropTypes.shape().isRequired
};
Login.defaultProps = {
    error: null,
    token: null
};

function mapStateToProps(state) {
    return {
        loading: state.Login.loading,
        error: state.Login.error,
        token: state.Global.token
    };
}

export default withRouter(connect(mapStateToProps)(Login));
