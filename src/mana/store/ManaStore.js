import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import ManaReducer from '../reducer/ManaReducer';

const StoreConfigure = () => createStore(ManaReducer, Middleware);
export default StoreConfigure;
