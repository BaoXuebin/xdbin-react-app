import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Container, Divider, Label } from 'semantic-ui-react';

import { selectTag, deleteTag } from '../actions/NewBlogAction';

const SelectedTag = ({ tagId, tagName, onDelete }) => (
    <Label color="green">
        {tagName}
        <Icon name="delete" onClick={() => { onDelete({ tagId, tagName }); }} />
    </Label>
);

const Tag = ({ disabled, tagId, tagName, onSelect }) => (
    <Label as="a" color={disabled ? 'grey' : 'green'} onClick={() => { if (!disabled) { onSelect({ tagId, tagName }); } }} content={tagName} />
);

Tag.propTypes = {
    disabled: PropTypes.bool.isRequired,
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

    ifSelected(tag) {
        const selectTags = this.props.selectTags;
        let index = -1;
        selectTags.forEach((t, i) => {
            if (t.tagId === tag.tagId) {
                index = i;
            }
        });
        return index >= 0;
    }

    render() {
        const { tags, selectTags } = this.props;
        return (
            <div className="xd-tags" style={{ marginLeft: '.5rem' }}>
                <Container fluid>
                    {selectTags.map(tag => <SelectedTag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} onDelete={this.deleteTag} />)}
                    <p style={{ marginTop: '1rem' }}># 标签池</p>
                    {tags.map(tag => <Tag key={tag.tagId} disabled={this.ifSelected(tag)} tagId={tag.tagId} tagName={tag.tagName} onSelect={this.selectTag} />)}
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
