import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTagIfNeeded } from '../action/ManaTagAction';

class TagInput extends PureComponent {
    constructor(props) {
        super(props);
        this.handleAddTag = this.handleAddTag.bind(this);
    }

    handleAddTag(event) {
        if (event.keyCode === 13) {
            const tag = this.tag.value;
            this.props.addTagIfNeeded(tag);
            this.tag.value = '';
        }
    }

    render() {
        const { error } = this.props;
        return (
            <div>
                <Input icon placeholder="添加标签" onKeyDown={this.handleAddTag}>
                    <input ref={(tag) => { this.tag = tag; }} />
                    <Icon name="tag" />
                </Input>
                {error && <Label basic color="red" pointing="left">{error}</Label>}
            </div>
        );
    }
}

TagInput.propTypes = {
    error: PropTypes.string,
    addTagIfNeeded: PropTypes.func.isRequired
};
TagInput.defaultProps = {
    error: null
};

const mapStateToProps = state => ({
    error: state.tag.error
});

const mapDispatchToProps = dispatch => ({
    addTagIfNeeded: bindActionCreators(addTagIfNeeded, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TagInput);
