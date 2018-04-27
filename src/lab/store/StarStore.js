import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import StarReducer from '../reducer/StarReducer';

const StoreConfigure = () => createStore(StarReducer, Middleware);
export default StoreConfigure;
