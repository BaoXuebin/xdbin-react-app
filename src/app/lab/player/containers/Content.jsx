import React, { Component } from 'react';
import { Grid, Sidebar } from 'semantic-ui-react';

import Cover from '../components/Cover';
import Info from '../components/Info';
import MusicList from './MusicList';

// const height =
class Content extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 初始化高度
        const windowHeight = document.body.clientHeight;
        const headerHeight = document.getElementById('playerHeader').offsetHeight;
        const controlHeight = document.getElementById('playerControl').offsetHeight;
        const contentHeight = windowHeight - headerHeight - controlHeight;
        document.getElementById('playerContent').style.height = `${contentHeight}px`;
    }

    render() {
        return (
            <div id="playerContent" style={{ marginTop: '-1rem' }}>
                <Sidebar.Pushable>
                    <Sidebar animation="overlay" className="slide-music-list" visible width="wide" direction="right">
                        <MusicList />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Grid textAlign="center">
                            <Grid.Row>
                                <Grid.Column>
                                    <Cover />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Info />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default Content;
