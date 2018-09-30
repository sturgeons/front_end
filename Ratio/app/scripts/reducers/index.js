import {combineReducers} from 'redux'
import StaticReducer from './StaticReducer';
import LoaderReducer from './LoaderReducer';
import LinePartReducer from './LinePartReducer';
import DataReducer from './DataReducer';

const Reducer = combineReducers({
    StaticReducer,
    LinePartReducer,
    DataReducer,
    LoaderReducer
});

export default Reducer;
