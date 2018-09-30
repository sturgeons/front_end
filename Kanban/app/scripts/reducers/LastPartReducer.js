import merge from 'lodash/merge';

export default (state = {
    lastpart: {}
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'lastpart':
            return merge({}, value);
        default:
            return state
    }
}
