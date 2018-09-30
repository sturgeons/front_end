import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk';

const storeBuilder = (reducer, initState) => createStore (
    reducer,
    initState,
    applyMiddleware(Thunk)
);

export default storeBuilder;
