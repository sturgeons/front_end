import merge from 'lodash/merge';

export default (state = {
    shift: {}
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'shift':
            return merge({}, value);
        default:
            return state
    }
}
