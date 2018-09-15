import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, TextArea, Form, Label } from 'semantic-ui-react';
import Config from '../../../config/Config';
import { publishCommentReq } from '../../utils/CommentReq';
import { isEmpty, isEmail } from '../../../utils/Util';
import { persist, get } from '../../../utils/LocalStorage';

class CommentEditor extends Component {
    constructor(props) {
        super(props);
        const userStr = get('_user');
        let user = null;
        if (!isEmpty(userStr)) {
            user = JSON.parse(userStr);
        }
        this.state = {
            loading: false,
            error: null,
            success: null,
            comment: null,
            username: user ? user.username : null,
            email: user ? user.email : null,
            website: user ? user.website : null
        };
        this.handlePublish = this.handlePublish.bind(this);
        this.handleClearHint = this.handleClearHint.bind(this);
    }

    handleClearHint() {
        this.setState({
            error: null,
            success: null
        });
    }

    handlePublish() {
        const username = this.username.inputRef.value;
        const email = this.email.inputRef.value;
        const website = this.website.inputRef.value;
        const comment = this.comment.ref.value;
        if (isEmpty(username)) {
            this.setState({ error: '昵称不能为空' });
            return;
        }
        if (isEmpty(email)) {
            this.setState({ error: '邮箱不能为空' });
            return;
        }
        if (!isEmail(email)) {
            this.setState({ error: '邮箱格式错误' });
            return;
        }
        // 保存信息至本地缓存
        persist('_user', { username, email, website });
        if (isEmpty(comment)) {
            this.setState({ error: '评论不能为空' });
            return;
        }
        this.setState({ loading: true, error: null, success: null });
        publishCommentReq({
            username,
            email,
            website,
            content: comment,
            origin: this.props.origin
        })
            .then((data) => {
                this.comment.ref.value = '';
                this.props.onPublish(data);
                this.setState({
                    success: '评论发表成功',
                    comment: '', // 清空评论内容
                    loading: false
                });
            })
            .catch((e) => { this.setState({ error: '评论发布失败', loading: false }); console.log(e); });
    }

    render() {
        const {
            loading,
            error,
            success,
            comment,
            username,
            email,
            website
        } = this.state;
        return (
            <Form>
                <Form.Field>
                    <TextArea
                        autoHeight
                        placeholder="说点什么吧 ~"
                        defaultValue={comment}
                        onFocus={this.handleClearHint}
                        ref={(input) => { this.comment = input; }}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        icon="users"
                        iconPosition="left"
                        placeholder="姓名"
                        defaultValue={username}
                        onFocus={this.handleClearHint}
                        ref={(input) => { this.username = input; }}
                        style={{ width: '300px' }}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        icon="mail"
                        iconPosition="left"
                        placeholder="邮箱"
                        defaultValue={email}
                        onFocus={this.handleClearHint}
                        ref={(input) => { this.email = input; }}
                        style={{ width: '300px' }}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        icon="globe"
                        iconPosition="left"
                        placeholder="网址(选填)"
                        defaultValue={website}
                        onFocus={this.handleClearHint}
                        ref={(input) => { this.website = input; }}
                        style={{ width: '300px' }}
                    />
                </Form.Field>
                <Button type="submit" color={Config.theme} loading={loading} onClick={this.handlePublish}>提交</Button>
                { error && <Label basic color="red">{error}</Label> }
                { success && <Label basic color="green">{success}</Label> }
            </Form>
        );
    }
}

CommentEditor.propTypes = {
    origin: PropTypes.string.isRequired,
    onPublish: PropTypes.func
};
CommentEditor.defaultProps = {
    onPublish: () => {}
};

export default CommentEditor;
