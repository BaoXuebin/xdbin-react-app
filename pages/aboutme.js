import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Icon, Popup, Divider } from 'semantic-ui-react';

import AboutmeStore from '../src/lab/store/AboutmeStore';
import Layout from '../src/blog/container/Layout';
import MarkdownPreview from '../src/blog/component/common/MarkdownPreview';

class Aboutme extends Component {
    static getInitialProps() {
        const global = {
            logo: {
                name: 'heartbeat',
                text: '关于我'
            },
            title: '关于我'
        };
        return { global };
    }

    render() {
        return (
            <div>
                <Popup
                    trigger={<Icon name="mail" size="large" link />}
                    content="baoxbin@hotmail.com"
                    on="hover"
                />
                <a href="https://github.com/BaoXuebin" style={{ color: 'black' }}>
                    <Popup
                        trigger={<Icon name="github" size="large" link />}
                        content="BaoXuebin"
                        on="hover"
                    />
                </a>
                <a href="https://weibo.com/u/3807733188" style={{ color: 'black' }}>
                    <Popup
                        trigger={<Icon name="weibo" size="large" link />}
                        content="@不经意的你"
                        on="hover"
                    />
                </a>|&nbsp;
                <a href="http://sfau.lt/bPIvMg" style={{ color: 'black' }}>
                    <Popup
                        trigger={<strong>SegmentFault</strong>}
                        content="@止于秋分"
                        on="hover"
                    />
                </a>
                <Divider />
                <MarkdownPreview style={{ margin: '2rem' }} text="先生不知何许人也，亦不详其姓字，宅边有五柳树，因以为号焉。闲静少言，不慕荣利。好读书，不求甚解；每有会意，便欣然忘食。性嗜酒，家贫不能常得。亲旧知其如此，或置酒而招之；造饮辄尽，期在必醉。既醉而退，曾不吝情去留。环堵萧然，不蔽风日；短褐穿结，箪瓢屡空，晏如也。常著文章自娱，颇示己志。忘怀得失，以此自终。" />
                <p style={{ textAlign: 'right', margin: '2rem' }}>「五柳先生传」</p>
            </div>
        );
    }
}

export default withRedux(AboutmeStore, null, null)(Layout(Aboutme));
