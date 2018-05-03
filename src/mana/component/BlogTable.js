import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';

import Pager from './Pager';

const BlogTableItem = ({ blog }) => {
    const {
        blogId,
        title,
        updateTime,
        ifPub
    } = blog;
    return (
        <Table.Row>
            <Table.Cell width={2}>{String(blogId).slice(-6)}</Table.Cell>
            <Table.Cell width={8}>{title}</Table.Cell>
            <Table.Cell width={3}>{moment(updateTime).format('MM.DD.YYYY')}</Table.Cell>
            <Table.Cell width={3}>
                <Button.Group basic>
                    <Button icon="edit" />
                    { ifPub === 1 ? <Button icon="eye" /> : <Button icon="hide" /> }
                    <Button icon="delete" />
                </Button.Group>
            </Table.Cell>
        </Table.Row>
    );
};

BlogTableItem.propTypes = {
    blog: PropTypes.shape().isRequired
};

const BlogTable = ({ blogs, total, current }) => {
    const _html = blogs.map(blog => <BlogTableItem key={blog.blogId} blog={blog} />);
    return (
        <Table celled loading>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>标题</Table.HeaderCell>
                    <Table.HeaderCell>时间</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {_html}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Pager total={total} current={current} onChange={(page) => { console.log(page); }} />
                </Table.Row>
            </Table.Footer>
        </Table>
    );
};

BlogTable.propTypes = {
    blogs: PropTypes.arrayOf(PropTypes.shape()),
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired
};
BlogTable.defaultProps = {
    blogs: []
};

export default BlogTable;
