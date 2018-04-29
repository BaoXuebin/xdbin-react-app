import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import ManaTagReducer from '../reducer/ManaTagReducer';

const StoreConfigure = () => createStore(ManaTagReducer, Middleware);
export default StoreConfigure;
