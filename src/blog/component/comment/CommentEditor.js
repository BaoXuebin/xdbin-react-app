import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, TextArea, Form, Label, Icon, Grid } from 'semantic-ui-react';
import Config from '../../../config/Config';
import { publishCommentReq } from '../../utils/CommentReq';
import { isEmpty, isEmail } from '../../../utils/Util';
import { persist, get } from '../../../utils/LocalStorage';

class CommentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            loading: false,
            error: null,
            comment: null,
            username: null,
            email: null,
            website: null,
            replyId: null
        };
        this.handlePublish = this.handlePublish.bind(this);
        this.handleClearHint = this.handleClearHint.bind(this);
        this.toggleShowType = this.toggleShowType.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
        this.handleClearReply = this.handleClearReply.bind(this);
    }

    componentDidMount() {
        const userStr = get('_user');
        let user = null;
        if (!isEmpty(userStr)) {
            user = JSON.parse(userStr);
        }
        this.onMount(() => {
            this.setState({
                type: user ? 'show' : 'edit',
                username: user ? user.username : null,
                email: user ? user.email : null,
                website: user ? user.website : null,
                replyId: this.props.replyId
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.replyId !== this.state.replyId) {
            this.setState({ replyId: nextProps.replyId });
        }
    }

    onMount(callback) {
        callback();
    }

    handleClearReply() {
        this.setState({ replyId: null });
    }

    handleClearHint() {
        this.setState({
            error: null
            // success: null
        });
    }

    toggleShowType() {
        this.setState({
            type: this.state.type === 'edit' ? 'show' : 'edit'
        });
    }

    handlePublish() {
        const comment = this.comment.ref.value;
        const {
            username,
            email,
            website,
            replyId
        } = this.state;
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
        if (isEmpty(comment)) {
            this.setState({ error: '评论不能为空' });
            return;
        }
        this.setState({ loading: true, error: null });
        publishCommentReq({
            username,
            email,
            website,
            content: comment,
            origin: this.props.origin,
            replyId
        })
            .then((data) => {
                this.comment.ref.value = '';
                this.props.onPublish(data);
                this.setState({
                    comment: '', // 清空评论内容
                    loading: false,
                    replyId: null
                });
            })
            .catch((e) => { this.setState({ error: '评论发布失败', loading: false }); console.log(e); });
    }

    handleChangeUsername(e) {
        this.setState({ username: e.target.value }, () => {
            const { username, email, website } = this.state;
            persist('_user', { username, email, website });
        });
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value }, () => {
            const { username, email, website } = this.state;
            persist('_user', { username, email, website });
        });
    }
    handleChangeWebsite(e) {
        this.setState({ website: e.target.value }, () => {
            const { username, email, website } = this.state;
            persist('_user', { username, email, website });
        });
    }

    render() {
        const {
            type,
            loading,
            error,
            comment,
            username,
            email,
            website,
            replyId
        } = this.state;
        return (
            <div id="reply-comment">
                <Form style={{ marginBottom: '1rem' }}>
                    { replyId &&
                        <Label image>
                            <img alt="头像" src="https://cn.gravatar.com/avatar/d7391870bd848246ba32d17dd031c4c6?s=80&r=G&d=" />
                            回复 #{replyId}
                            <Icon name="delete" onClick={this.handleClearReply} />
                        </Label>
                    }
                    <div style={{ height: '.5rem' }} />
                    <TextArea
                        autoHeight
                        placeholder="说点什么吧 ~"
                        defaultValue={comment}
                        onFocus={this.handleClearHint}
                        ref={(input) => { this.comment = input; }}
                    />
                </Form>
                {
                    type === 'show' &&
                        <Grid>
                            <Grid.Column floated="left" width={12}>
                                <Label basic>
                                    <Icon name="users" /> {username}
                                </Label>
                                <Label basic>
                                    <Icon name="mail" /> {email}
                                </Label>
                                <Label basic>
                                    <Icon name="globe" /> {website}
                                </Label>
                                <Label basic as="a" onClick={this.toggleShowType}>
                                    <Icon name="edit" />
                                </Label>
                            </Grid.Column>
                            <Grid.Column floated="right" width={4} style={{ maxWidth: '100px' }} textAlign="right">
                                <Button type="submit" size="mini" color={Config.theme} loading={loading} onClick={this.handlePublish}>提交</Button>
                            </Grid.Column>
                        </Grid>
                }
                {
                    type === 'edit' &&
                        <Form>
                            <Form.Field>
                                <Input
                                    icon="users"
                                    iconPosition="left"
                                    placeholder="姓名"
                                    value={username}
                                    onFocus={this.handleClearHint}
                                    onChange={this.handleChangeUsername}
                                    ref={(input) => { this.username = input; }}
                                    style={{ width: '300px' }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder="邮箱"
                                    value={email}
                                    onFocus={this.handleClearHint}
                                    onChange={this.handleChangeEmail}
                                    ref={(input) => { this.email = input; }}
                                    style={{ width: '300px' }}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    icon="globe"
                                    iconPosition="left"
                                    placeholder="网址(选填)"
                                    value={website}
                                    onFocus={this.handleClearHint}
                                    onChange={this.handleChangeWebsite}
                                    ref={(input) => { this.website = input; }}
                                    style={{ width: '300px' }}
                                />
                            </Form.Field>
                            <Button size="mini" basic onClick={this.toggleShowType}>保存信息</Button>
                            <Button size="mini" color={Config.theme} loading={loading} onClick={this.handlePublish}>提交</Button>
                        </Form>
                }
                { error && <Label basic color="red">{error}</Label> }
            </div>
        );
    }
}

CommentEditor.propTypes = {
    origin: PropTypes.string.isRequired,
    onPublish: PropTypes.func,
    replyId: PropTypes.number
};
CommentEditor.defaultProps = {
    onPublish: () => {},
    replyId: null
};

export default CommentEditor;
