import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import GlobalReducer from './GlobalReducer';

export default combineReducers({
    Blog: BlogReducer,
    Global: GlobalReducer
});
