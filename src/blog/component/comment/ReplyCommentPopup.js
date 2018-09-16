import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { fetchCommentReq } from '../../utils/CommentReq';

moment.locale('zh-cn');

class ReplyCommentPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            comment: null,
            replyId: null,
            error: null
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen() {
        this.setState({ open: true }, () => {
            if (this.props.replyId !== this.state.replyId) {
                this.setState({ loading: true, error: null });
                fetchCommentReq(this.props.replyId)
                    .then((result) => {
                        if (result.id) {
                            this.setState({ loading: false, replyId: result.id, comment: result });
                        } else {
                            this.setState({ error: '评论已被删除', replyId: this.props.replyId, loading: false });
                        }
                    })
                    .catch(() => { this.setState({ error: '获取评论失败', loading: false }); });
            }
        });
    }

    handleClose() {
        this.setState({ open: false });
    }

    render() {
        const {
            loading,
            open,
            error,
            comment
        } = this.state;
        let _html = '';
        if (loading) {
            _html = <Icon loading name="spinner" />;
        } else if (error) {
            _html = error;
        } else if (comment) {
            _html = [
                <Popup.Header key="header">
                    {comment.username}&nbsp;&nbsp;
                    {
                        comment.username === '止于秋分' &&
                            <Label color="red" horizontal style={{ padding: '.2rem', fontWeight: 'normal' }}>
                                作者
                            </Label>
                    }
                    { comment.replyId && '回复' }
                    { comment.replyId && <span style={{ cursor: 'pointer', margin: '0 .2rem', color: 'grey' }}>#{comment.replyId}</span> }
                    <span style={{ fontSize: '12px', fontWeight: 'normal', color: 'gray' }}>{moment(comment.publishTime).fromNow()}</span>
                </Popup.Header>,
                <Popup.Content key="content">
                    {comment.content}
                </Popup.Content>
            ];
        }
        return (
            <Popup
                trigger={<span style={{ cursor: 'pointer', margin: '0 .2rem', color: 'grey' }}>#{this.props.replyId}</span>}
                wide="very"
                hoverable
                open={open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
            >
                { _html }
            </Popup>
        );
    }
}

ReplyCommentPopup.propTypes = {
    replyId: PropTypes.number.isRequired
};

export default ReplyCommentPopup;
