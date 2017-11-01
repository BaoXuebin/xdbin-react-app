import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Icon, Popup, Dropdown } from 'semantic-ui-react';
import {
    Link,
    withRouter
} from 'react-router-dom';

import { GITHUB_URL, WEIBO_URL } from '../data/Urls';
import { toggleTheme, logout, validate } from '../actions/GlobalAction';

function Head(props) {
    const { theme, dispatch, history, token } = props;
    // 验证是否是登录状态
    if (!token) {
        const localToken = localStorage.token;
        if (localToken) {
            dispatch(validate(localToken));
        }
    }
    const handleToggleTheme = () => {
        dispatch(toggleTheme(theme));
    };
    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };
    const ifNight = theme === 'night';
    return (
        <Segment color={ifNight ? 'black' : 'green'} inverted={ifNight} style={{ borderRadius: 0 }}>
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        <Link to="/">
                            <img style={{ margin: '-6px' }} src="http://oxrjqkvly.bkt.clouddn.com/xdbin_logo.png" alt="xdbin" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        { token !== null &&
                            <Popup
                                trigger={<Link to="/manager" style={{ color: 'green' }}><Icon name="anchor" inverted={ifNight} size="large" /></Link>}
                                content="「后台管理」"
                                on="hover"
                            />
                        }
                        <Popup
                            trigger={<Link to="/lab" style={{ color: 'black' }}><Icon name="lab" inverted={ifNight} size="large" /></Link>}
                            content="「实验室」"
                            on="hover"
                        />
                        <Popup
                            trigger={<a href={WEIBO_URL} style={{ color: 'black' }}><Icon name="weibo" inverted={ifNight} size="large" /></a>}
                            content="@不经意的你"
                            on="hover"
                        />
                        <Popup
                            trigger={<a href={GITHUB_URL} style={{ color: 'black' }}><Icon name="github" inverted={ifNight} size="large" /></a>}
                            content="@BaoXuebin"
                            on="hover"
                        />
                        <Dropdown>
                            <Dropdown.Menu>
                                { theme === 'day' && <Dropdown.Item icon="moon" content="主题" onClick={handleToggleTheme} /> }
                                { theme === 'night' && <Dropdown.Item icon="sun" content="主题" onClick={handleToggleTheme} /> }
                                { token === null
                                    ? <Dropdown.Item icon="privacy" content="登录" onClick={() => history.push('/login')} />
                                    : <Dropdown.Item icon="log out" content="退出" onClick={handleLogout} />
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    );
}

Head.propTypes = {
    dispatch: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    history: PropTypes.shape().isRequired,
    token: PropTypes.string
};
Head.defaultProps = {
    text: 'xdbin',
    token: null
};

function mapStateToProps(state) {
    return {
        theme: state.Global.theme,
        token: state.Global.token
    };
}

export default withRouter(connect(mapStateToProps)(Head));
