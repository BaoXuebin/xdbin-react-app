import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

// <div className="tag">
//     <a rel={id}>{name}</a>
// </div>

const Tag = ({ id, name }) => (
    <div rel={id} className="ui image label" >
        {name}
        <Icon name="delete" />
    </div>
);

Tag.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default function TagPool({ tags }) {
    return (
        <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
            <div className="tag">
                # 标签池
            </div>
            {tags.map(tag => <Tag key={tag.tagId} id={tag.tagId} name={tag.tagName} />)}
        </div>
    );
}

TagPool.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object).isRequired
};
