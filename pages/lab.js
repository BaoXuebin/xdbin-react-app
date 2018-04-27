import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Grid } from 'semantic-ui-react';

import LabStore from '../src/blog/store/LabStore';
import Layout from '../src/blog/container/Layout';
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
        // const firstPlatHtml = LabData.map((lab, i) => {
        //     if (i % 3 === 0) {
        //         return <LabCard key={lab.id} data={lab} />;
        //     }
        //     return '';
        // });
        // const secondPlatHtml = LabData.map((lab, i) => {
        //     if (i % 3 === 1) {
        //         return <LabCard key={lab.id} data={lab} />;
        //     }
        //     return '';
        // });
        // const thirdPlatHtml = LabData.map((lab, i) => {
        //     if (i % 3 === 2) {
        //         return <LabCard key={lab.id} data={lab} />;
        //     }
        //     return '';
        // });
        return (
            <Grid doubling columns={3} verticalAlign="top">
                { _html }
            </Grid>
        );
    }
}

export default withRedux(LabStore, null, null)(Layout(Lab));
