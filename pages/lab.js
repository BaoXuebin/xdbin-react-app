import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Grid, Segment, Divider } from 'semantic-ui-react';

import LabStore from '../src/blog/store/LabStore';
import LabLayout from '../src/lab/container/LabLayout';
import LabCard from '../src/blog/component/lab/LabCard';
import LabData from '../src/blog/data/LabData';

class Lab extends Component {
    static async getInitialProps() {
        const global = {
            page: 1,
            logo: {
                name: 'lab',
                text: '小东西'
            },
            title: '「小东西」'
        };
        return { global };
    }

    render() {
        const _html = LabData.map(lab => <Grid.Column key={lab.id}><LabCard data={lab} /></Grid.Column>);
        return (
            <Segment style={{ maxWidth: '1000px', margin: '1rem auto', padding: '30px 50px' }}>
                <Divider horizontal>Alpha</Divider>
                <Grid doubling columns={4} verticalAlign="top">
                    { _html }
                </Grid>
                <Divider />
            </Segment>
        );
    }
}

export default withRedux(LabStore, null, null)(LabLayout(Lab));
