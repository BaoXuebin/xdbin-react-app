import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button, Header
} from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import BlogTable from '../components/BlogTable';
import TagPool from '../components/TagPool';
import ErrorLabel from '../components/ErrorLabel';
import { fetchTagIfNeed } from '../actions/TagAction';
import { fetchAllBlogByPageIfNeeded, fetchAllBlogError, removeFetchAllBlogError } from '../actions/BlogAction';

class Manager extends Component {
    constructor(props) {
        super(props);
        this.prePage = this.prePage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    }

    componentWillMount() {
        // 加载博客列表
        this.props.dispatch(fetchAllBlogByPageIfNeeded(1, this.props.history));
        // 加载标签
        this.props.dispatch(fetchTagIfNeed());
    }

    prePage() {
        const page = this.props.page;
        if (page > 1) {
            this.props.dispatch(fetchAllBlogByPageIfNeeded(page - 1, this.props.history));
        } else {
            this.props.dispatch(fetchAllBlogError('已经是第一页'));
        }
    }

    nextPage() {
        const { page } = this.props;
        this.props.dispatch(fetchAllBlogByPageIfNeeded(page + 1, this.props.history));
    }

    render() {
        const { blogs, error } = this.props;
        const empty = !(blogs && blogs.length > 0);
        const { history } = this.props;
        return (
            <div>
                <Header as="h3" content="博客管理" />
                <Button.Group size="mini">
                    <Button content="Add" icon="add" color="green" labelPosition="left" size="mini" onClick={() => history.push('/blog/add')} />
                </Button.Group>
                <BlogTable blogs={blogs} />
                {
                    !empty &&
                    <Button.Group size="mini">
                        <Button onClick={this.prePage}>前一页</Button>
                        <Button onClick={this.nextPage}>后一页</Button>
                    </Button.Group>
                }
                <ErrorLabel error={error} delayCallBack={removeFetchAllBlogError} />
                <Header as="h3" content="标签管理" />
                <TagPool controllable history={history} />
            </div>
        );
    }
}

Manager.propTypes = {
    page: PropTypes.number.isRequired,
    blogs: PropTypes.arrayOf(PropTypes.shape()),
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired
};

Manager.defaultProps = {
    blogs: [],
    error: null
};

function mapStateToProps(state) {
    // page, blogs, loading, error
    return state.Blog.manager;
}

export default withRouter(connect(mapStateToProps)(Manager));
