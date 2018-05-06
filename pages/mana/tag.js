import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Divider } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

import ManaStore from '../../src/mana/store/ManaStore';
import AuthLayout from '../../src/mana/wrapper/AuthLayout';
import TagItem from '../../src/blog/component/tag/TagItem';
import TagInput from '../../src/mana/component/TagInput';
import { redirect, fetchAllTagReq } from '../../src/blog/utils/TagReq';
import { initTags } from '../../src/mana/action/ManaTagAction';

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

    componentWillMount() {
        const { tags } = this.props.global;
        this.props.initTags(tags);
    }

    render() {
        const { tags, loading } = this.props;
        const _html = tags.map(tag => (<TagItem key={tag.tagId} tag={tag} link={false} del />));
        return [
            <TagInput key="tag-input" loading={loading} />,
            <Divider key="divider" horizontal>
                <span style={{ color: 'gray' }}>全部标签</span>
            </Divider>,
            <div key="tag-pool" className="xd-tags" style={{ display: 'inline-block', marginLeft: '.5rem' }}>
                {_html}
            </div>
        ];
    }
}

Tag.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    loading: PropTypes.bool.isRequired,
    global: PropTypes.shape().isRequired,
    initTags: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
    tags: state.tag.tags || props.global.tags,
    loading: state.tag.loading,
    error: state.tag.error
});

const mapDispatchToProps = dispatch => ({
    initTags: bindActionCreators(initTags, dispatch)
});


export default withRedux(ManaStore, mapStateToProps, mapDispatchToProps)(AuthLayout(Tag));
