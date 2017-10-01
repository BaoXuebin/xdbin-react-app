import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    Button, Header
} from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import BlogTable from '../components/BlogTable';
import TagPool from '../components/TagPool';
import { fetchTagIfNeed } from '../actions/TagAction';

class Manager extends Component {
    componentWillMount() {
        // 加载博客列表
        // 加载标签
        this.props.dispatch(fetchTagIfNeed());
    }

    render() {
        const blogs = [
            {
                id: 'asd2ds',
                title: '测试一',
                publishTime: moment().format('MM.DD.YYYY')
            },
            {
                id: '1sdd3s',
                title: '测试二',
                publishTime: moment().format('MM.DD.YYYY')
            }
        ];
        const { history } = this.props;
        return (
            <div>
                <Header as="h3" content="博客管理" />
                <Button content="Add" icon="add" color="green" labelPosition="left" onClick={() => history.push('/blog/add')} />
                <BlogTable blogs={blogs} />
                <Header as="h3" content="标签管理" />
                <TagPool controllable history={history} />
            </div>
        );
    }
}

Manager.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired
};

function mapStateToProps(state) {
    return {};
}

export default withRouter(connect(mapStateToProps)(Manager));
