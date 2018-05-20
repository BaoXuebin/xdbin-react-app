import React from 'react';
import PropTypes from 'prop-types';

import TagItem from '../../blog/component/tag/TagItem';

const TagGroup = ({ tags, icon, onClick }) => {
    const _html = tags.map(tag => (<TagItem key={tag.tagId} tag={tag} link={false} icon={icon} onClick={onClick} />));
    return (
        <div key="tag-pool" className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
            {_html}
        </div>
    );
};

TagGroup.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape().isRequired),
    icon: PropTypes.string,
    onClick: PropTypes.func
};
TagGroup.defaultProps = {
    tags: [],
    icon: null,
    onClick: () => {}
};


export default TagGroup;
