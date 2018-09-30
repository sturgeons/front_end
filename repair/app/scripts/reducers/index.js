import {combineReducers} from 'redux';
import StaticReducer from './StaticReducer';
import STdatasReducer from './STdatasReducer';
import PartsReducer from './PartsReducer';
import StoreReducer from './StoreReducer';
import TipsReducer from './TipsReducer';
import STinstoreReducer from './STinstoreReducer';
import SToutstoreReducer from './SToutstoreReducer';
import LoaderReducer from './LoaderReducer';

const Reducer = combineReducers({
    StaticReducer,
    StoreReducer,
    STdatasReducer,
    TipsReducer,
    STinstoreReducer,
    SToutstoreReducer,
    LoaderReducer,
    PartsReducer
});

export default Reducer;
