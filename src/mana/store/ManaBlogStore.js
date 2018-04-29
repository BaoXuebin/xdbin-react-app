import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import ManaBlogReducer from '../reducer/ManaBlogReducer';

const StoreConfigure = () => createStore(ManaBlogReducer, Middleware);
export default StoreConfigure;
