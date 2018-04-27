import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import LoginReducer from '../reducer/LoginReducer';

const StoreConfigure = () => createStore(LoginReducer, Middleware);
export default StoreConfigure;
