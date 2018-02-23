import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ tag }) => (
    <div className="tag">
        <a>{tag}</a>
    </div>
);

const Tags = ({ tags }) => {
    const hasTag = tags && tags.length && tags.length > 0;
    if (hasTag) {
        return (
            <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                <div className="tag">
                    # 标签
                </div>
                {tags.map(tag => <Tag key={tag.tagId} tag={tag.tagName} />)}
            </div>
        );
    }
    return (
        <span />
    );
};

Tag.propTypes = {
    tag: PropTypes.string.isRequired
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape())
};
Tags.defaultProps = {
    tags: []
};

export default Tags;
