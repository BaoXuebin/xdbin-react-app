import React from 'react';
import PropTypes from 'prop-types';

import TagItem from './TagItem';

const Tag = ({ tags }) => {
    const hasTag = tags && tags.length > 0;
    if (hasTag) {
        return (
            <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                {tags.map(tag => <TagItem key={tag.tagId} tag={tag} />)}
            </div>
        );
    }
    return <span />;
};

Tag.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape().isRequired)
};
Tag.defaultProps = {
    tags: []
};

export default Tag;
