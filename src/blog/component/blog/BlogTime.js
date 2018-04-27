import React from 'react';
import moment from 'moment';
import { Icon, Popup } from 'semantic-ui-react';

const BlogTime = ({ publishTime, updateTime }) => {
    if (updateTime === publishTime) {
        return (<span style={{ color: 'gray', fontSize: 13 }}>{moment(publishTime).format('MM.DD.YYYY')}</span>);
    }
    return [
        <Popup
            key="blogTime-date"
            trigger={
                <span style={{ color: 'gray', fontSize: 13 }}>{moment(updateTime).format('MM.DD.YYYY')}</span>
            }
            content={`${moment(publishTime).format('MM.DD.YYYY')} 发布`}
            on="hover"
        />,
        <Icon key="blogTime-icon" name="write" color="grey" size="mini" style={{ marginLeft: '.2rem' }} />
    ];
};

export default BlogTime;
