import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Divider, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import ManaStore from '../../src/mana/store/ManaStore';
import AuthLayout from '../../src/mana/wrapper/AuthLayout';
import TagItem from '../../src/blog/component/tag/TagItem';
import TagInput from '../../src/mana/component/TagInput';
import { redirect, fetchAllTagReq } from '../../src/blog/utils/TagReq';
import { initTags, showDelModal, hideDelModal, delTagIfNeeded } from '../../src/mana/action/ManaTagAction';
import ModalWrapper from '../../src/mana/wrapper/ModalWrapper';

class Tag extends Component {
    static async getInitialProps(ctx) {
        const global = {
            logo: {
                name: 'tag',
                text: '标签管理'
            },
            title: '标签管理',
            active: 'tag'
        };
        await fetchAllTagReq()
            .then((tags) => { global.tags = tags; })
            .catch(() => { redirect(ctx.res); });
        return { global };
    }

    constructor(props) {
        super(props);
        this.delTag = {};
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
    }

    componentWillMount() {
        const { tags } = this.props.global;
        this.props.initTags(tags);
    }

    componentWillReceiveProps(nextProps) {
        const { delTagId } = this.props;
        if (delTagId !== nextProps.delTagId) {
            const [tag] = nextProps.tags.filter(t => nextProps.delTagId === t.tagId);
            this.delTag = tag || {};
        }
    }

    handleDeleteTag() {
        this.props.delTagIfNeeded(this.props.delTagId);
    }

    render() {
        const { tags, loading, modal } = this.props;
        const _html = tags.map(tag => (<TagItem key={tag.tagId} tag={tag} link={false} del onDel={this.props.showDelModal} />));
        return [
            <TagInput key="tag-input" loading={loading} />,
            <Divider key="divider" horizontal>
                <span style={{ color: 'gray' }}>全部标签</span>
            </Divider>,
            <div key="tag-pool" className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                {_html}
            </div>,
            <ModalWrapper
                key="tag-modal"
                open={modal}
                onClose={this.props.hideDelModal}
                title="删除？"
                content={(<p>确定删除 <Icon name="tag" />「{this.delTag.tagName}」标签？</p>)}
                onPositive={this.handleDeleteTag}
            />
        ];
    }
}

Tag.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loading: PropTypes.bool.isRequired,
    modal: PropTypes.bool.isRequired,
    delTagId: PropTypes.number,
    global: PropTypes.shape().isRequired,
    initTags: PropTypes.func.isRequired,
    showDelModal: PropTypes.func.isRequired,
    hideDelModal: PropTypes.func.isRequired,
    delTagIfNeeded: PropTypes.func.isRequired
};
Tag.defaultProps = {
    delTagId: null
};

const mapStateToProps = (state, props) => ({
    tags: state.tag.tags || props.global.tags,
    loading: state.tag.loading,
    error: state.tag.error,
    modal: state.tag.modal,
    delTagId: state.tag.delTagId
});

const mapDispatchToProps = dispatch => ({
    initTags: bindActionCreators(initTags, dispatch),
    showDelModal: bindActionCreators(showDelModal, dispatch),
    hideDelModal: bindActionCreators(hideDelModal, dispatch),
    delTagIfNeeded: bindActionCreators(delTagIfNeeded, dispatch)
});


export default withRedux(ManaStore, mapStateToProps, mapDispatchToProps)(AuthLayout(Tag));
