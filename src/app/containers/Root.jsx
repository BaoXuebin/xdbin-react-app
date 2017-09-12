import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    hashHistory,
    Switch
} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import '../../../static/styles/main.less';
import configureStore from '../stores/ConfigureStore';
// import Blog from './Blog';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import BlogDetail from './BlogDetail';
// import NewBlog from './NewBlog';
import Bundle from '../components/Bundle';

const Root = () => (
    <Provider store={configureStore()}>
        <Router history={hashHistory}>
            <div>
                <Header />
                <Grid centered>
                    <Grid.Column computer={10} mobile={16}>
                        <Route exact path="/" render={() => <Bundle load={() => import('./Blog')}>
                                {Blog => <Blog />}
                            </Bundle>} />
                        <Route exact path="/blog" render={() => <Bundle load={() => import('./Blog')}>
                                {Blog => <Blog />}
                            </Bundle>} />
                        <Switch>
                            <Route path="/blog/add" render={() => <Bundle load={() => import('./NewBlog')}>
                                {NewBlog => <NewBlog />}
                            </Bundle>} />
                            <Route path="/blog/:id" render={() => <Bundle load={() => import('./BlogDetail')}>
                                    {BlogDetail => <BlogDetail />}
                                </Bundle>} />
                        </Switch>
                    </Grid.Column>
                </Grid>
                <Footer />
            </div>
        </Router>
    </Provider>
);

export default Root;
