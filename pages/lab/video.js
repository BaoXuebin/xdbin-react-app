import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { Grid, Segment, Divider } from 'semantic-ui-react';

import LabStore from '../../src/blog/store/LabStore';
import LabLayout from '../../src/lab/container/LabLayout';
import VideoCard from '../../src/lab/component/video/VideoCard';

class Video extends Component {
    static async getInitialProps() {
        const global = {
            page: 1,
            logo: {
                name: 'film',
                text: '短片'
            },
            title: '「短片」'
        };
        return { global };
    }

    render() {
        return (
            <Segment className="lab-container">
                <Divider />
                <Grid doubling columns={3} verticalAlign="top">
                    <Grid.Column>
                        <VideoCard data={{
                            id: 'Beckham x Zidane - Create Respect',
                            title: 'Beckham x Zidane - Create Respect',
                            image: 'http://oxrjqkvly.bkt.clouddn.com/pics/20180708002808',
                            source: 'http://oxrjqkvly.bkt.clouddn.com/pics/20180707154404'
                        }}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <VideoCard data={{
                            id: 'One Minute Fly',
                            title: 'One Minute Fly',
                            image: 'http://oxrjqkvly.bkt.clouddn.com/pics/20180708003458',
                            source: 'http://oxrjqkvly.bkt.clouddn.com/pics/20180707180132'
                        }}
                        />
                    </Grid.Column>
                </Grid>
                <Divider />
            </Segment>
        );
    }
}

export default withRedux(LabStore, null, null)(LabLayout(Video));
