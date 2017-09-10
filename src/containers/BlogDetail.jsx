import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Container, Header, Divider } from 'semantic-ui-react';
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
        const { match, blogs } = this.props;
        this.blogId = match.params.id;
        if (blogs && blogs.length > 0) {
            this.blog = blogs.filter(b => b.id === this.blogId)[0];
        }
        this.props.dispatch(fetchBlogDetailIfNeeded(this.blogId));
    }

    render() {
        const hasBlog = this.blog !== null;
        const temp = this.blog ? (this.blog.publishTime || 0) : 0;
        const publishTimeStr = moment(temp).format('MM.DD.YYYY');
        const { textType, content } = this.props.blogDetail;
        return (
            <Grid centered>
                <Grid.Column computer={10} mobile={16}>
                    <Segment>
                        <Container text>
                            {
                                hasBlog ?
                                    <div>
                                        <Header as="h2" content={this.blog.title} />
                                        <span style={{ color: 'gray', fontSize: 13 }}>{publishTimeStr}</span>
                                        <Tags tags={this.blog.tags} />
                                        <Divider />
                                        <BlogContent textType={textType} content={content} />
                                    </div>
                                    : '404'
                            }
                        </Container>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

BlogDetail.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    blogs: PropTypes.arrayOf(PropTypes.object),
    blogDetail: PropTypes.shape({
        textType: PropTypes.string,
        content: PropTypes.string
    })
};
BlogDetail.defaultProps = {
    blogs: [],
    blogDetail: {
        textType: null,
        content: ''
    }
};

function mapStateToProps(state) {
    return {
        blogs: state.Blog.blogs,
        blogDetail: state.Blog.detail
    };
}

export default connect(mapStateToProps)(BlogDetail);
