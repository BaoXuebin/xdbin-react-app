import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Container, Divider, Label, Modal, Button, Input } from 'semantic-ui-react';

import { selectTag, removeTag } from '../actions/NewBlogAction';
import { addTagIfNeed, deleteTagIfNeed, removeError } from '../actions/TagAction';

const SelectedTag = ({ tagId, tagName, onRemove }) => (
    <Label color="green">
        {tagName}
        <Icon name="delete" onClick={() => { onRemove({ tagId, tagName }); }} />
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
    onRemove: PropTypes.func.isRequired
};

class TagPool extends Component {
    constructor(props) {
        super(props);
        this.onSelectTag = this.onSelectTag.bind(this);
        this.onRemoveTag = this.onRemoveTag.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
        this.onAddTag = this.onAddTag.bind(this);
        this.onHandleFocus = this.onHandleFocus.bind(this);
        this.state = { open: false, delTag: {} };
    }

    onDeleteTag() {
        const tag = this.state.delTag;
        this.props.dispatch(deleteTagIfNeed(tag, this.props.history));
        this.closeModal();
    }

    onSelectTag(tag) {
        this.props.dispatch(selectTag(tag));
    }

    onRemoveTag(tag) {
        const controllable = this.props.controllable;
        if (controllable) {
            this.setState({ open: true, delTag: tag });
            // this.props.dispatch(deleteTag(tag));
        } else {
            this.props.dispatch(removeTag(tag));
        }
    }

    onAddTag() {
        const tagName = this.tagInput.inputRef.value;
        const history = this.props.history;
        this.props.dispatch(addTagIfNeed({ tagName }, history));
        this.tagInput.inputRef.value = '';
    }

    onHandleFocus() {
        this.props.dispatch(removeError());
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

    closeModal() {
        this.setState({ open: false });
    }

    render() {
        const { tags, selectTags, controllable, error } = this.props;
        return (
            <div className="xd-tags" style={{ marginLeft: '.5rem' }}>
                <Container fluid>
                    {
                        controllable ?
                            <div>
                                <Input
                                    icon="tags"
                                    iconPosition="left"
                                    placeholder="输入要添加的标签"
                                    action={{ color: 'green', content: '添加', onClick: this.onAddTag }}
                                    onFocus={this.onHandleFocus}
                                    ref={(tagInput) => { this.tagInput = tagInput; }}
                                />
                                { error && <Label basic color="red">{error}</Label> }
                                <p style={{ marginTop: '1rem' }}># 标签池</p>
                                {tags.map(tag => <SelectedTag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} onRemove={this.onRemoveTag} />)}
                            </div> :
                            <div>
                                {selectTags.map(tag => <SelectedTag key={tag.tagId} tagId={tag.tagId} tagName={tag.tagName} onRemove={this.onRemoveTag} />)}
                                <p style={{ marginTop: '1rem' }}># 标签池</p>
                                {tags.map(tag => <Tag key={tag.tagId} disabled={this.ifSelected(tag)} tagId={tag.tagId} tagName={tag.tagName} onSelect={this.onSelectTag} />)}
                            </div>
                    }
                    <Divider />
                </Container>
                <Modal size="mini" open={this.state.open} onClose={this.closeModal}>
                    <Modal.Header>
                        删除？
                    </Modal.Header>
                    <Modal.Content>
                        <p>确定删除 {this.state.delTag.tagName} 标签？</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeModal}>
                            No
                        </Button>
                        <Button positive icon="checkmark" labelPosition="right" content="Yes" onClick={this.onDeleteTag} />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

TagPool.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string,
    selectTags: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    controllable: PropTypes.bool,
    history: PropTypes.shape()
};
TagPool.defaultProps = {
    controllable: false,
    error: null,
    history: {}
};

function mapStateToProps(state) {
    return {
        selectTags: state.NewBlog.selectTags,
        tags: state.Tag.tags,
        error: state.Tag.error
    };
}

export default connect(mapStateToProps)(TagPool);
