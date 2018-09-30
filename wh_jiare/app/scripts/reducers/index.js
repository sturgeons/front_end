import {combineReducers} from 'redux';
import StaticReducer from './StaticReducer';
import PartsReducer from './PartsReducer';
import StoreReducer from './StoreReducer';
import TipsReducer from './TipsReducer';
import STinstoreReducer from './STinstoreReducer';
import SToutstoreReducer from './SToutstoreReducer';
import QadnoReducer from './QadnoReducer';
import LoaderReducer from './LoaderReducer';

const Reducer = combineReducers({
    StaticReducer,
    StoreReducer,
    TipsReducer,
    STinstoreReducer,
    QadnoReducer,
    SToutstoreReducer,
    LoaderReducer,
    PartsReducer
});

export default Reducer;
