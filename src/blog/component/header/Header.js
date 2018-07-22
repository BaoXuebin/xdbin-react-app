import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Segment, Container, Grid, Header, Icon, Popup } from 'semantic-ui-react';

import SearchBar from '../blog/SearchBar';
import { toggleSearchBar, changeKeyword } from '../../action/SearchAction';
import { fetchBlogListIfNeeded } from '../../action/BlogAction';

const NavHeader = (props) => {
    const {
        logo,
        show,
        keyword,
        search
    } = props;
    return (
        <div>
            <Segment color="red" id="playerHeader" style={{ borderRadius: 0 }}>
                <Container>
                    <Grid columns={2}>
                        <Grid.Column>
                            <Header as="h2">
                                <Icon name={logo.name} color="red" />
                                <Header.Content>
                                    {logo.text}
                                </Header.Content>
                            </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            { search && <Icon name="search" size="large" link onClick={props.toggleSearchBar} /> }
                            <a href="/blog" style={{ color: 'black' }}>
                                <Popup
                                    trigger={<Icon name="book" size="large" link />}
                                    content="「笔记」"
                                    on="hover"
                                />
                            </a>
                            <a href="/lab/star" style={{ color: 'black' }}>
                                <Popup
                                    trigger={<Icon name="rss" size="large" link />}
                                    content="「订阅」"
                                    on="hover"
                                />
                            </a>
                            <a href="/lab" style={{ color: 'black' }}>
                                <Popup
                                    trigger={<Icon name="lab" size="large" link />}
                                    content="「小东西」"
                                    on="hover"
                                />
                            </a>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
            { search &&
                <SearchBar
                    show={show}
                    value={keyword}
                    onChange={props.changeKeyword}
                    onSearch={props.fetchBlogListIfNeeded}
                />
            }
        </div>
    );
};

NavHeader.propTypes = {
    logo: PropTypes.shape(),
    show: PropTypes.bool.isRequired,
    search: PropTypes.bool,
    keyword: PropTypes.string,
    toggleSearchBar: PropTypes.func.isRequired,
    changeKeyword: PropTypes.func.isRequired,
    fetchBlogListIfNeeded: PropTypes.func.isRequired
};
NavHeader.defaultProps = {
    logo: {
        name: 'code',
        text: '笔记'
    },
    keyword: '',
    search: false
};

const mapStateToProps = state => ({
    show: state.search ? state.search.show : false,
    keyword: state.search ? state.search.keyword : null
});
const mapDispatchToProps = dispatch => ({
    toggleSearchBar: bindActionCreators(toggleSearchBar, dispatch),
    changeKeyword: bindActionCreators(changeKeyword, dispatch),
    fetchBlogListIfNeeded: bindActionCreators(fetchBlogListIfNeeded, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
