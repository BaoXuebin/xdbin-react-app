import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Segment, Grid, Icon, Popup, Dropdown } from 'semantic-ui-react';

import { GITHUB_URL, WEIBO_URL } from '../data/Urls';
import { toggleTheme } from '../actions/GlobalAction';

function Head(props) {
    const { text, theme, dispatch } = props;
    const handleToggleTheme = () => {
        dispatch(toggleTheme(theme));
    };
    const ifNight = theme === 'night';
    return (
        <div style={{ marginBottom: 15 }}>
            <Segment color={ifNight ? 'black' : 'green'} inverted={ifNight}>
                <Container>
                    <Grid columns={2}>
                        <Grid.Column>
                            <h2>{text}</h2>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
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
                                    { theme === 'day' && <Dropdown.Item icon="moon" onClick={handleToggleTheme} /> }
                                    { theme === 'night' && <Dropdown.Item icon="sun" onClick={handleToggleTheme} /> }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        </div>
    );
}

Head.propTypes = {
    dispatch: PropTypes.func.isRequired,
    text: PropTypes.string,
    theme: PropTypes.string.isRequired
};
Head.defaultProps = {
    text: 'xdbin'
};

function mapStateToProps(state) {
    return {
        theme: state.Global.theme
    };
}

export default connect(mapStateToProps)(Head);
