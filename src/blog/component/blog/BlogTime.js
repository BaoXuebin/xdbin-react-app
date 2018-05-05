import React from 'react';
import moment from 'moment';
import { Popup } from 'semantic-ui-react';

const BlogTime = ({ publishTime, updateTime }) => {
    if (updateTime === publishTime) {
        return (<span style={{ color: 'gray', fontSize: 13 }}>{moment(publishTime).format('YYYY.MM.DD HH:mm')}</span>);
    }
    return [
        <div key="blogTime-icon" className="xd-tags" style={{ display: 'inline-block', marginRight: '.3rem' }}>
            编辑时间
        </div>,
        <Popup
            key="blogTime-date"
            trigger={
                <span style={{ color: 'gray', fontSize: 13 }}>{moment(updateTime).format('YYYY.MM.DD HH:mm')}</span>
            }
            content={`${moment(publishTime).format('YYYY.MM.DD HH:mm')} 发布`}
            on="hover"
        />
    ];
};

export default BlogTime;
