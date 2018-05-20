import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import EditReducer from '../reducer/EditReducer';

const StoreConfigure = () => createStore(EditReducer, Middleware);
export default StoreConfigure;
