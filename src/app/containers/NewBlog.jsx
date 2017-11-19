import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Icon, Divider, Button, Checkbox, Dimmer, Loader } from 'semantic-ui-react';
import {
    withRouter
} from 'react-router-dom';

import MarkdownEditor from '../components/MarkdownEditor';
import ErrorLabel from '../components/ErrorLabel';
import TagPool from '../components/TagPool';
import TitleInput from '../components/TitleInput';
import { fetchTagIfNeed } from '../actions/TagAction';
import {
    togglePub,
    validateFormError,
    removeError,
    submitBlogIfNeeded,
    fetchUpdateBlogByIdIfNeed,
    removeSuccessLabel,
    initNewBlogData
} from '../actions/NewBlogAction';

class NewBlog extends PureComponent {
    constructor(props) {
        super(props);
        this.blogId = null;
        this.updateBlog = {};
        this.toastText = '添加成功';
        this.headerTitle = '新建博客';
        this.togglePub = this.togglePub.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchTagIfNeed());
        const { match } = this.props;
        this.blogId = match.params.id;
        if (this.props.update) {
            this.props.dispatch(fetchUpdateBlogByIdIfNeed(this.blogId));
        } else {
            // 初始化 state 中的博客数据
            this.props.dispatch(initNewBlogData());
        }
    }

    togglePub(ifPub) {
        this.props.dispatch(togglePub(ifPub));
    }

    handleSubmit() {
        // 验证表单
        const errors = [this.title, this.summary, this.content].map(c => c.validate()).filter(e => e !== null);
        if (errors && errors.length > 0) {
            this.props.dispatch(validateFormError(errors));
        } else {
            const updateBlog = this.props.update ? this.props.updateBlog : null;
            const tags = this.props.selectTags.map(tag => tag.tagId).join(',');
            const blog = {
                title: this.title.getValue(),
                tags,
                summary: this.summary.getValue(),
                content: this.content.getValue(),
                ifPub: this.props.ifPub
            };

            if (updateBlog && updateBlog.blogId) {
                blog.blogId = updateBlog.blogId;
            }

            this.props.dispatch(submitBlogIfNeeded(blog, this.props.history));
        }
    }

    removeError(errorKey) {
        this.props.dispatch(removeError(errorKey));
    }

    render() {
        const { ifPub, errors, update, loading, updateSuccess } = this.props;
        const updateBlog = update ? this.props.updateBlog : {};
        const toastText = update ? '修改成功' : '添加成功';
        const headerTitle = update ? '修改博客' : '新建博客';
        return (
            <Container>
                <Header as="h2">
                    <Icon name="pencil" />
                    <Header.Content>
                        {headerTitle}
                    </Header.Content>
                </Header>
                <Divider />
                <TitleInput
                    title={updateBlog.title}
                    errors={errors}
                    ref={(title) => { this.title = title; }}
                    removeError={this.removeError}
                />
                <br />
                <TagPool />
                <Header as="h3" content="摘要内容" />
                <MarkdownEditor
                    content={updateBlog.summary}
                    ref={(summary) => { this.summary = summary; }}
                    errorKey="summary"
                    errors={errors}
                    validate={{ maxLength: 1000 }}
                />
                <Divider />
                <Header as="h3" content="博客内容" />
                <MarkdownEditor
                    content={updateBlog.content}
                    ref={(content) => { this.content = content; }}
                    errorKey="content"
                    errors={errors}
                    validate={{ nullable: false }}
                />
                <Divider />
                <Checkbox toggle checked={ifPub} label="公开" onChange={(e, d) => this.togglePub(d.checked)} />
                <Divider />
                <Button color="blue" onClick={() => this.props.history.push('/manager')}>返回</Button>
                <Button color="green" disabled={loading} loading={loading} onClick={this.handleSubmit}>提交</Button>
                <ErrorLabel color="green" error={updateSuccess ? toastText : null} delayCallBack={removeSuccessLabel} />
                {
                    loading &&
                        <Dimmer active inverted>
                            <Loader />
                        </Dimmer>
                }
            </Container>
        );
    }
}

NewBlog.propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    ifPub: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTags: PropTypes.arrayOf(PropTypes.object).isRequired,
    update: PropTypes.bool,
    updateBlog: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    loading: PropTypes.bool,
    updateSuccess: PropTypes.bool
};
NewBlog.defaultProps = {
    ifPub: true,
    update: false,
    loading: false,
    updateSuccess: false
};


function mapStateToProps(state) {
    return {
        ifPub: state.NewBlog.ifPub,
        selectTags: state.NewBlog.selectTags,
        errors: state.NewBlog.errors,
        updateBlog: state.NewBlog.updateBlog,
        loading: state.NewBlog.loading,
        updateSuccess: state.NewBlog.updateSuccess
    };
}

export default withRouter(connect(mapStateToProps)(NewBlog));
