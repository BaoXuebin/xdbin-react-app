import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Divider, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';

import Tags from '../components/Tags';
import BlogContent from '../components/BlogContent';
import { fetchBlogDetailIfNeeded } from '../actions/BlogAction';

class BlogDetail extends Component {
    constructor(props) {
        super(props);
        this.blog = null;
        this.blogId = null;
    }

    componentWillMount() {
        const { match } = this.props;
        this.blogId = match.params.id;
        this.props.dispatch(fetchBlogDetailIfNeeded(this.blogId));
    }

    render() {
        const { loading, theme } = this.props;
        const { title, updateTime, tags, contentTextType, content } = this.props.blogDetail;
        return (
            <Container text className="xd-content">
                {loading ?
                    <Dimmer active inverted={theme === 'day'}>
                        <Loader size="medium">Loading</Loader>
                    </Dimmer> :
                    <div>
                        <Header as="h2" content={title} />
                        <span style={{ color: 'gray', fontSize: 13 }}>{moment(updateTime).format('MM.DD.YYYY')}</span>
                        <Tags tags={tags} />
                        <Divider />
                        <BlogContent textType={contentTextType} content={content} />
                    </div>
                }
            </Container>
        );
    }
}

BlogDetail.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    blogDetail: PropTypes.shape({
        contentTextType: PropTypes.string,
        title: PropTypes.string,
        updateTime: PropTypes.number,
        content: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    }),
    loading: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired
};
BlogDetail.defaultProps = {
    blogDetail: {
        contentTextType: 'markdown',
        content: '',
        tags: []
    }
};

function mapStateToProps(state) {
    return {
        blogDetail: state.Blog.detail,
        loading: state.Blog.loading,
        theme: state.Global.theme
    };
}

export default connect(mapStateToProps)(BlogDetail);
