import {BUTTON_CLICK} from '../commons/ActionTypes';
import merge from 'lodash/merge';
import Buttons from '../commons/Buttons';

let defaultState = {}

Buttons.forEach((item) => {
    defaultState[item.id] = false;
});

const ButtonReducer = (state = defaultState, action) => {
    let newState = merge({}, state);
    newState[action.id] = !state[action.id];

    switch(action.type){
        case BUTTON_CLICK:
            return newState;
        default:
            return state
    }
}

export default ButtonReducer
