import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Container, Divider } from 'semantic-ui-react';

import { selectTag, deleteTag } from '../actions/NewBlogAction';

const SelectedTag = ({ tagId, tagName, onDelete }) => (
    <div rel={tagId} className="ui image label" >
        {tagName}
        <Icon name="delete" onClick={() => { onDelete({ tagId, tagName }); }} />
    </div>
);

const Tag = ({ tagId, tagName, onSelect }) => (
    <div rel={tagId} className="ui image label" onClick={() => { onSelect({ tagId, tagName }); }}>
        {tagName}
    </div>
);

Tag.propTypes = {
    tagId: PropTypes.number.isRequired,
    tagName: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
SelectedTag.propTypes = {
    tagId: PropTypes.number.isRequired,
    tagName: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};

class TagPool extends Component {
    constructor(props) {
        super(props);
        this.selectTag = this.selectTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    selectTag(tag) {
        this.props.dispatch(selectTag(tag));
    }

    deleteTag(tag) {
        this.props.dispatch(deleteTag(tag));
    }

    render() {
        const { tags, selectTags } = this.props;
        return (
            <div className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                <Container fluid>
                    {selectTags.map(tag => <SelectedTag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} onDelete={this.deleteTag} />)}
                    <p style={{ marginTop: '1rem' }}># 标签池</p>
                    {tags.length > 0 && tags.map(tag => <Tag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} onSelect={this.selectTag} />)}
                    <Divider />
                </Container>
            </div>
        );
    }
}

TagPool.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTags: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        selectTags: state.NewBlog.selectTags,
        tags: state.Tag.tags
    };
}

export default connect(mapStateToProps)(TagPool);
