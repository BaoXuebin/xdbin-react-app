import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Divider, Button, Checkbox } from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import EditorAndPreview from '../components/EditorAndPreview';
import TagPool from '../components/TagPool';
import TitleInput from '../components/TitleInput';
import { fetchTagIfNeed } from '../actions/TagAction';
import { togglePub, validateFormError, removeError, submitBlogIfNeeded } from '../actions/NewBlogAction';

class NewBlog extends PureComponent {
    constructor(props) {
        super(props);
        this.togglePub = this.togglePub.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchTagIfNeed());
    }

    togglePub(ifPub) {
        this.props.dispatch(togglePub(ifPub));
    }

    handleSubmit() {
        const errors = [this.title, this.summary].map(c => c.validate()).filter(e => e !== null);
        if (errors && errors.length > 0) {
            this.props.dispatch(validateFormError(errors));
        } else {
            const tags = this.props.selectTags.map(tag => tag.tagId).join(',');
            const blog = {
                title: this.title.getValue(),
                tags,
                summary: this.summary.getValue(),
                content: this.content.getValue(),
                ifPub: this.props.ifPub
            };
            this.props.dispatch(submitBlogIfNeeded(blog, this.props.history));
        }
    }

    removeError(errorKey) {
        this.props.dispatch(removeError(errorKey));
    }

    render() {
        const { ifPub, errors } = this.props;
        return (
            <Segment>
                <Header as="h2">
                    <Icon name="pencil" />
                    <Header.Content>
                        新建博客
                    </Header.Content>
                </Header>
                <Divider />
                <TitleInput errors={errors} ref={(title) => { this.title = title; }} removeError={this.removeError} />
                <br />
                <TagPool /><br />
                <EditorAndPreview
                    errorKey="preview"
                    validate={{ nullable: true, maxLength: 1000 }}
                    label="概要内容"
                    ref={(summary) => { this.summary = summary; }}
                    removeError={this.removeError}
                />
                <br />
                <EditorAndPreview
                    errorKey="content"
                    label="博客内容"
                    ref={(content) => { this.content = content; }}
                    removeError={this.removeError}
                    rows={20}
                />
                <br />
                <Checkbox toggle defaultChecked={ifPub} label="公开" onChange={(e, d) => this.togglePub(d.checked)} />
                <Divider />
                <Button color="green" onClick={this.handleSubmit}>提交</Button>
            </Segment>
        );
    }
}

NewBlog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    ifPub: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTags: PropTypes.arrayOf(PropTypes.object).isRequired
};
NewBlog.defaultProps = {
    ifPub: true
};


function mapStateToProps(state) {
    return {
        ifPub: state.NewBlog.ifPub,
        selectTags: state.NewBlog.selectTags,
        errors: state.NewBlog.errors
    };
}

export default withRouter(connect(mapStateToProps)(NewBlog));
