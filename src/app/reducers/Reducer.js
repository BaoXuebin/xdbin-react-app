import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import GlobalReducer from './GlobalReducer';
import TagReducer from './TagReducer';
import NewBlogReducer from './NewBlogReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    Blog: BlogReducer,
    Tag: TagReducer,
    NewBlog: NewBlogReducer,
    Global: GlobalReducer,
    Login: LoginReducer
});
