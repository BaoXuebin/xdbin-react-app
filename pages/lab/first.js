import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { Segment, Divider, Header } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';

class First extends Component {
    static async getInitialProps() {
        const global = {
            page: 1,
            logo: {
                name: 'paper plane',
                text: '第一次'
            },
            title: '「第一次」'
        };
        return { global };
    }

    render() {
        return (
            <Segment className="lab-container">
                <div style={{
                    
                }}>
                    <Header as="h3">第一次坐飞机</Header>
                </div>
            </Segment>
        );
    }
}

export default withRedux(LabStore, null, null)(LabLayout(First));
