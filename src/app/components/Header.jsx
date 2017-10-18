import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Icon, Popup, Dropdown } from 'semantic-ui-react';
import {
    Link,
    withRouter
} from 'react-router-dom';

import { GITHUB_URL, WEIBO_URL } from '../data/Urls';
import { toggleTheme, logout } from '../actions/GlobalAction';

function Head(props) {
    const { text, theme, dispatch, history, token } = props;
    const handleToggleTheme = () => {
        dispatch(toggleTheme(theme));
    };
    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };
    const ifNight = theme === 'night';
    return (
        <Segment color={ifNight ? 'black' : 'green'} inverted={ifNight}>
            <Container>
                <Grid columns={2}>
                    <Grid.Column>
                        <Link to="/"><h2 style={{ color: ifNight ? 'white' : 'black' }}>{text}</h2></Link>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Popup
                            trigger={<Link to="/lab" style={{ color: 'black' }}><Icon name="lab" inverted={ifNight} size="large" /></Link>}
                            content="「实验室」"
                            on="hover"
                        />
                        {'  '}
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
    text: PropTypes.string,
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
