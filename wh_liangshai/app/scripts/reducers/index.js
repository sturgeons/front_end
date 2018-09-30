import {combineReducers} from 'redux';
import StaticReducer from './StaticReducer';
import UnitsReducer from './UnitsReducer';
import PartsReducer from './PartsReducer';
import StoreReducer from './StoreReducer';
import TipsReducer from './TipsReducer';
import STinstoreReducer from './STinstoreReducer';
import SToutstoreReducer from './SToutstoreReducer';
import LoaderReducer from './LoaderReducer';

const Reducer = combineReducers({
    StaticReducer,
    UnitsReducer,
    StoreReducer,
    TipsReducer,
    STinstoreReducer,
    SToutstoreReducer,
    LoaderReducer,
    PartsReducer
});

export default Reducer;
