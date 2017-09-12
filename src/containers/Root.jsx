import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    hashHistory,
    Switch
} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import configureStore from '../stores/ConfigureStore';
import Blog from './Blog';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogDetail from './BlogDetail';
import NewBlog from './NewBlog';
import '../../static/styles/main.less';

const Root = () => (
    <Provider store={configureStore()}>
        <Router history={hashHistory}>
            <div>
                <Header />
                <Grid centered>
                    <Grid.Column computer={10} mobile={16}>
                        <Route exact path="/" component={Blog} />
                        <Route exact path="/blog" component={Blog} />
                        <Switch>
                            <Route path="/blog/add" component={NewBlog} />
                            <Route path="/blog/:id" component={BlogDetail} />
                        </Switch>
                    </Grid.Column>
                </Grid>
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default Root;
