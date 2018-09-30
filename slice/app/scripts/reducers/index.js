import {combineReducers} from 'redux';
import StaticReducer from './StaticReducer';
import PartsReducer from './PartsReducer';
import StoreReducer from './StoreReducer';
import TipsReducer from './TipsReducer';
import LoaderReducer from './LoaderReducer';

const Reducer = combineReducers({
    StaticReducer,
    StoreReducer,
    TipsReducer,
    LoaderReducer,
    PartsReducer
});

export default Reducer;
