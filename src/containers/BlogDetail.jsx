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
        const { match } = this.props;
        this.blogId = match.params.id;
        this.props.dispatch(fetchBlogDetailIfNeeded(this.blogId));
    }

    render() {
        const { title, updateTime, tags, textType, content } = this.props.blogDetail;
        return (
            <Grid centered>
                <Grid.Column computer={10} mobile={16}>
                    <Segment>
                        <Container text>
                            <div>
                                <Header as="h2" content={title} />
                                <span style={{ color: 'gray', fontSize: 13 }}>{moment(updateTime).format('MM.DD.YYYY')}</span>
                                <Tags tags={tags} />
                                <Divider />
                                <BlogContent textType={textType} content={content} />
                            </div>
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
    blogDetail: PropTypes.shape({
        textType: PropTypes.string,
        title: PropTypes.string,
        updateTime: PropTypes.number,
        content: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string)
    })
};
BlogDetail.defaultProps = {
    blogDetail: {
        textType: null,
        content: '',
        tags: []
    }
};

function mapStateToProps(state) {
    return {
        blogDetail: state.Blog.detail
    };
}

export default connect(mapStateToProps)(BlogDetail);
