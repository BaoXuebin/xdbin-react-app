import React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    hashHistory,
    Switch
} from 'react-router-dom';

import '../../../static/styles/main.less';
import configureStore from '../stores/ConfigureStore';
import Layout from './Layout';
import Bundle from '../components/Bundle';

const Root = () => (
    <Provider store={configureStore()}>
        <Router history={hashHistory}>
            <div>
                <Route exact path="/" render={() => <Layout>
                    <Bundle load={() => import('./Blog')}>
                        {Blog => <Blog />}
                    </Bundle>
                </Layout>} />
                <Route exact path="/blog" render={() => <Layout>
                    <Bundle load={() => import('./Blog')}>
                        {Blog => <Blog />}
                    </Bundle>
                </Layout>} />
                <Switch>
                    <Route path="/blog/add" render={() => <Layout>
                        <Bundle load={() => import('./NewBlog')}>
                            {NewBlog => <NewBlog />}
                        </Bundle>
                    </Layout>} />
                    <Route path="/blog/:id" render={({ match }) => <Layout>
                        <Bundle load={() => import('./BlogDetail')}>
                            {BlogDetail => <BlogDetail match={match} />}
                        </Bundle>
                    </Layout>} />
                </Switch>
            </div>
        </Router>
    </Provider>
);

export default Root;
