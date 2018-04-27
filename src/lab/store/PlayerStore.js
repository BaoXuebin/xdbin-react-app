import { createStore } from 'redux';

import Middleware from '../../blog/store/Middleware';
import PlayerReducer from '../reducer/PlayerReducer';

const StoreConfigure = () => createStore(PlayerReducer, Middleware);
export default StoreConfigure;
