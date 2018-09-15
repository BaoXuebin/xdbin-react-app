import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';

const BlogTime = ({ publishTime, updateTime }) => {
    if (updateTime === publishTime) {
        return (<span style={{ color: 'gray', fontSize: 13, lineHeight: '30px' }}>{moment(publishTime).format('YYYY.MM.DD HH:mm')}</span>);
    }
    return (
        <Popup
            key="blogTime-date"
            trigger={
                <span style={{ color: 'gray', fontSize: 13, lineHeight: '30px' }}>{moment(updateTime).format('YYYY.MM.DD HH:mm')}</span>
            }
            content={`${moment(publishTime).format('YYYY.MM.DD HH:mm')} 发布`}
            on="hover"
        />
    );
};

BlogTime.propTypes = {
    publishTime: PropTypes.number.isRequired,
    updateTime: PropTypes.number.isRequired
};

export default BlogTime;
