import {combineReducers} from 'redux'
import StaticReducer from './StaticReducer';
import LoaderReducer from './LoaderReducer';
import DataReducer from './DataReducer';

const Reducer = combineReducers({
    StaticReducer,
    DataReducer,
    LoaderReducer
});

export default Reducer;
