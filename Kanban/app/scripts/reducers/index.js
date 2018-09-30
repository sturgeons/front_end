import {combineReducers} from 'redux'
import ButtonReducer from './ButtonReducer';
import StaticReducer from './StaticReducer';
import LoaderReducer from './LoaderReducer';
import PointsReducer from './PointsReducer';
import LineReducer from './LineReducer';
import OPReducer from './OPReducer';
import LastPartReducer from './LastPartReducer';
import PlanReducer from './PlanReducer';
import WorkDataReducer from './WorkDataReducer';
import ShiftReducer from './ShiftReducer';
import ProduceReducer from './ProduceReducer';
import ValidTimesReducer from './ValidTimesReducer';
import OEEReducer from './OEEReducer';
import DownTimeReducer from './DownTimeReducer';
import ShiftDataReducer from './ShiftDataReducer';
import ActualDataReducer from './ActualDataReducer';
import OPDataReducer from './OPDataReducer';
import DownMinuteReducer from './DownMinuteReducer';

const Reducer = combineReducers({
    ButtonReducer,
    StaticReducer,
    LoaderReducer,
    PointsReducer,
    LineReducer,
    OPReducer,
    LastPartReducer,
    PlanReducer,
    ProduceReducer,
    ValidTimesReducer,
    OEEReducer,
    WorkDataReducer,
    ActualDataReducer,
    DownTimeReducer,
    ShiftDataReducer,
    OPDataReducer,
    DownMinuteReducer,
    ShiftReducer
});

export default Reducer;
