import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import AboutmeReducer from '../reducer/AboutmeReducer';

const StoreConfigure = () => createStore(AboutmeReducer, Middleware);
export default StoreConfigure;
