import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import GlobalReducer from './GlobalReducer';
import TagReducer from './TagReducer';

export default combineReducers({
    Blog: BlogReducer,
    Tag: TagReducer,
    Global: GlobalReducer
});
