import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';

import TagItem from './TagItem';
import SelectTag from './SelectTag';

const TagPool = ({ tags, selectTag }) => {
    const _html = tags.map(tag => (<TagItem key={tag.tagId} tag={tag} />));
    if (selectTag) {
        return [
            <div key="select-xd-tags" style={{ display: 'block', textAlign: 'center' }}>
                <SelectTag tag={selectTag.tagName} />
            </div>,
            <Divider key="divider" horizontal>
                <span style={{ color: 'gray' }}>全部标签</span>
            </Divider>,
            <div key="xd-tags-pool" className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                {_html}
            </div>
        ];
    }
    return (
        <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
            {_html}
        </div>
    );
};

TagPool.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selectTag: PropTypes.shape()
};
TagPool.defaultProps = {
    selectTag: null
};

export default TagPool;
