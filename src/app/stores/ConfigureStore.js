import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers/Reducer';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

// export default function configureStore() {
//     return createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// }

export default function configureStore() {
    return createStoreWithMiddleware(reducer);
}
