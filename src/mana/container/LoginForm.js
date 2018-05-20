import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Grid, Header, Input, Message, Segment } from 'semantic-ui-react';

import Config from '../../config/Config';
import { loginError, clearError, loginIfNeeded } from '../action/LoginAction';

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.hanldeLogin = this.hanldeLogin.bind(this);
    }

    hanldeLogin() {
        const username = this.username.inputRef.value;
        const password = this.password.inputRef.value;
        if (!username) {
            this.props.loginError('用户名不能为空');
        } else if (!password) {
            this.props.loginError('密码不能为空');
        } else {
            this.props.loginIfNeeded(username, password, this.props.return);
        }
    }

    render() {
        const { loading, error } = this.props;
        return (
            <Grid
                textAlign="center"
                style={{ height: '100%', marginTop: '100px' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color={Config.theme} textAlign="center">
                        Log-in to your account
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Field>
                                <Input
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="User name"
                                    onFocus={this.props.clearError}
                                    ref={(username) => { this.username = username; }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    onFocus={this.props.clearError}
                                    ref={(password) => { this.password = password; }}
                                />
                            </Form.Field>
                            <Button loading={loading} color={Config.theme} fluid size="large" onClick={this.hanldeLogin}>Login</Button>
                        </Segment>
                    </Form>
                    {
                        error ? <Message error>{error}</Message> : <Message>{Config.defaultTitle}</Message>
                    }
                </Grid.Column>
            </Grid>
        );
    }
}

LoginForm.propTypes = {
    return: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    loginError: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    loginIfNeeded: PropTypes.func.isRequired
};
LoginForm.defaultProps = {
    error: null
};

const mapStateToProps = state => ({
    loading: state.loading,
    error: state.error
});

const mapDispatchToProps = dispatch => ({
    loginError: bindActionCreators(loginError, dispatch),
    clearError: bindActionCreators(clearError, dispatch),
    loginIfNeeded: bindActionCreators(loginIfNeeded, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
