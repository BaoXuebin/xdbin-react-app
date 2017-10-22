import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import GlobalReducer from './GlobalReducer';
import TagReducer from './TagReducer';
import NewBlogReducer from './NewBlogReducer';
import LoginReducer from './LoginReducer';
import LabReducer from './LabReducer';
import PlayerReducer from '../lab/player/reducers/PlayerReducer';

export default combineReducers({
    Blog: BlogReducer,
    Tag: TagReducer,
    NewBlog: NewBlogReducer,
    Global: GlobalReducer,
    Login: LoginReducer,
    Lab: LabReducer,
    Player: PlayerReducer
});
