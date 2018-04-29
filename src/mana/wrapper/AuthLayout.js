import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Divider } from 'semantic-ui-react';

import Head from '../../blog/component/common/Head';
import Header from '../../blog/component/header/Header';
import Config from '../../config/Config';
import { authReq } from '../util/ManaReq';
import { initUser } from '../action/AuthAction';
import { nologin } from '../../utils/Req';
import Footer from '../../blog/component/common/Footer';
import ManaMenu from '../container/ManaMenu';

// const mapStateToProps = (state, props) => {
//     global
// };

const mapDispatchToProps = dispatch => ({
    initUser: bindActionCreators(initUser, dispatch)
});


export default ChildComponent => connect(null, mapDispatchToProps)(class extends Component {
    static async getInitialProps(ctx) {
        const global = {};
        if (ctx.req) {
            // 这里做登录验证
            await authReq(ctx.req.headers.cookie)
                .then((user) => { global.user = user; })
                .catch(() => { nologin(ctx.res); });
        }
        if (ChildComponent.getInitialProps) {
            const props = await ChildComponent.getInitialProps(ctx);
            return Object.assign(props, global);
        }
        return { global };
    }

    componentWillMount() {
        const { user } = this.props;
        if (user) {
            this.props.initUser(user);
        }
    }

    render() {
        const global = this.props.global || {};
        return [
            <Head key="head" title={global.title || Config.title} />,
            <Header key="header" logo={global.logo || null} search={global.search || false} />,
            <Grid centered key="body" style={{ margin: '-1rem 0' }}>
                <Grid.Column computer={10} plant={13} mobile={16} className="xd-body">
                    <ManaMenu active={global.active} />
                    <ChildComponent {...this.props} />
                    <Divider />
                    <Footer />
                </Grid.Column>
            </Grid>
        ];
    }
});
