import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import NoneReducer from '../reducer/NoneReducer';

const StoreConfigure = () => createStore(NoneReducer, Middleware);
export default StoreConfigure;
