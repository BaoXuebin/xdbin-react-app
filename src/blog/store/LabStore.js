import { createStore } from 'redux';

import Middleware from './Middleware';
import LabReducer from '../reducer/LabReducer';

const StoreConfigure = () => createStore(LabReducer, Middleware);
export default StoreConfigure;
