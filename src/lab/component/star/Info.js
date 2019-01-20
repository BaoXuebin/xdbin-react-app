import React, { Component } from 'react';
import { Container, Icon, Popup, Grid, Dropdown } from 'semantic-ui-react';
import { fetchAllOriginsReq } from '../../utils/StarBlogReq';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            origins: []
        };
        this.handleReqOrigins = this.handleReqOrigins.bind(this);
        this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    }

    componentDidMount() {
        this.handleReqOrigins();
    }

    handleReqOrigins() {
        fetchAllOriginsReq()
            .then((origins) => {
                this.setState({
                    origins
                });
            })
            .catch((e) => { console.error(e); });
    }

    handleChangeOrigin(event, data) {
        this.props.onChangeOrigin(data.value);
    }

    render() {
        const { origins } = this.state;
        const options = origins.map(o => ({ key: o.origin, value: o.origin, text: `${o.origin} [${o.count}篇]` }));
        options.unshift({ key: 'all', value: '', text: '全部' });
        return (
            <Container textAlign="right">
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign="left" width={12}>
                            <Dropdown style={{ marginLeft: '1rem' }} text={this.props.origin || '全部'} options={options} onChange={this.handleChangeOrigin} />, 
                        </Grid.Column>
                        <Grid.Column textAlign="right" width={4}>
                            <Popup
                                trigger={<Icon name="info circle" color="grey" link />}
                                content="「关注的一些博客内容」"
                                on="hover"
                            />
                            <a href="https://github.com/BaoXuebin/BlogSpider" style={{ color: 'black' }}>
                                <Popup
                                    trigger={<Icon name="github" link />}
                                    content="https://github.com/BaoXuebin/BlogSpider"
                                    on="hover"
                                />
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default Info;
