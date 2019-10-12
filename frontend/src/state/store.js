// REDUX
import { createStore, applyMiddleware, compose }   from 'redux';

// MIDDLEWARE
import thunk                                       from "redux-thunk";

// REDUCER
import reducer                                     from './reducers';


// Redux devtools windows extension
const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middleware = applyMiddleware(thunk);

const enhancer = compose(
    middleware,
    devToolsExtension,
);

const store =  createStore(reducer, enhancer);

export default store;