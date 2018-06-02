import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Divider, Grid, Message } from 'semantic-ui-react';

import BlogTime from '../../blog/component/blog/BlogTime';
import { saveBlogIfNeeded, delBlogTag, addBlogTag, toggleIfPub } from '../action/EditAction';
import OperateButtonBar from '../container/OperateButtonBar';
import Editor from '../component/Editor';
import TagGroup from '../component/TagGroup';
import IfPubcbox from '../component/IfPubcbox';
import Uploader from '../component/Uploader';

class EditContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSaveBlog = this.handleSaveBlog.bind(this);
    }

    handleSaveBlog() {
        const title = this.title.innerHTML;
        const summary = this.summaryMde.getValue();
        const content = this.contentMde.getValue();
        const blog = Object.assign(this.props.blog, {
            title,
            summary,
            content
        });
        this.props.saveBlogIfNeeded(blog);
        if (!blog.blogId) {
            this.summaryMde.reset();
            this.contentMde.reset();
        }
    }

    render() {
        const {
            blog,
            tags,
            loading,
            error,
            tagPool,
            ifPub,
            add
        } = this.props;
        const {
            title,
            publishTime,
            updateTime,
            summary,
            content
        } = blog;
        return (
            <Container text className="xd-content">
                {
                    error && <Message negative><p>{error}</p></Message>
                }
                <Grid>
                    <Grid.Column width={13} verticalAlign="middle">
                        <h2 ref={(tt) => { this.title = tt; }} contentEditable suppressContentEditableWarning>{title}</h2>
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={3} verticalAlign="middle">
                        {
                            add ?
                                <OperateButtonBar loading={loading} content="发布" onSave={this.handleSaveBlog} /> :
                                <OperateButtonBar loading={loading} content="同步" onSave={this.handleSaveBlog} />
                        }
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <BlogTime publishTime={publishTime} updateTime={updateTime} />
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={10}>
                            <TagGroup tags={tags} icon="remove" onClick={this.props.delBlogTag} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <TagGroup tags={tagPool} icon="add" onClick={this.props.addBlogTag} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider horizontal>图片上传</Divider>
                <Uploader />
                <Divider horizontal>预览内容</Divider>
                <Editor text={summary} ref={(summaryMde) => { this.summaryMde = summaryMde; }} />
                <Divider horizontal>笔记内容</Divider>
                <Editor text={content} ref={(contentMde) => { this.contentMde = contentMde; }} />
                <Divider horizontal>是否公开</Divider>
                <IfPubcbox ifPub={ifPub} onChange={this.props.toggleIfPub} />
            </Container>
        );
    }
}

EditContainer.propTypes = {
    add: PropTypes.bool,
    ifPub: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    tagPool: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    blog: PropTypes.shape().isRequired,
    saveBlogIfNeeded: PropTypes.func.isRequired,
    delBlogTag: PropTypes.func.isRequired,
    addBlogTag: PropTypes.func.isRequired,
    toggleIfPub: PropTypes.func.isRequired
};
EditContainer.defaultProps = {
    add: false,
    error: null
};

const mapStateToProps = state => ({
    blog: state.blog,
    editable: state.editable,
    loading: state.loading,
    error: state.error,
    tags: state.blog ? state.blog.tags : [],
    tagPool: state.tags,
    ifPub: state.blog ? state.blog.ifPub : true
});

const mapDispatchToProps = dispatch => ({
    saveBlogIfNeeded: bindActionCreators(saveBlogIfNeeded, dispatch),
    delBlogTag: bindActionCreators(delBlogTag, dispatch),
    addBlogTag: bindActionCreators(addBlogTag, dispatch),
    toggleIfPub: bindActionCreators(toggleIfPub, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);
