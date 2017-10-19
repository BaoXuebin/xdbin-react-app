import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/PlayerReducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

// export default function configureStore() {
//     return compose(createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
// }

export default function configureStore() {
    return compose(createStoreWithMiddleware(reducer));
}
