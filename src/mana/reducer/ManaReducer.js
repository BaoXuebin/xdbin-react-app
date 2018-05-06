import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ManaBlogReducer from './ManaBlogReducer';
import ManaTagReducer from './ManaTagReducer';

export default combineReducers({
    auth: AuthReducer,
    blog: ManaBlogReducer,
    tag: ManaTagReducer
});
