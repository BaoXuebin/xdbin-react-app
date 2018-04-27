import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Prod from '../../config/Prod';

const Middleware = process.env.NODE_ENV === Prod.NODE_ENV ?
    applyMiddleware(thunkMiddleware) :
    composeWithDevTools(applyMiddleware(thunkMiddleware));

export default Middleware;
