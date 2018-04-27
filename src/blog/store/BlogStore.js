import { createStore } from 'redux';

import Middleware from './Middleware';
import BlogReducer from '../reducer/BlogReducer';

const StoreConfigure = () => createStore(BlogReducer, Middleware);
export default StoreConfigure;
