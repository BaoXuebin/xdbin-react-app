import { createStore } from 'redux';

import Middleware from './Middleware';
import TagReducer from '../reducer/TagReducer';

const StoreConfigure = () => createStore(TagReducer, Middleware);
export default StoreConfigure;
