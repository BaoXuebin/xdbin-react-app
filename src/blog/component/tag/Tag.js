import React from 'react';
import PropTypes from 'prop-types';

import TagItem from './TagItem';

const Tag = ({ tags, del, onDel }) => {
    const hasTag = tags && tags.length > 0;
    if (hasTag) {
        return (
            <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                {tags.map(tag => <TagItem key={tag.tagId} tag={tag} del={del} onDel={onDel} />)}
            </div>
        );
    }
    return <span />;
};

Tag.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape().isRequired),
    del: PropTypes.bool,
    onDel: PropTypes.func
};
Tag.defaultProps = {
    tags: [],
    del: false,
    onDel: () => {}
};

export default Tag;
