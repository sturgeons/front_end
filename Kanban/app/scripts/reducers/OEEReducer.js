import merge from 'lodash/merge';

export default (state = {
    oee: {}
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'oee':
            return merge({}, state, value);
        default:
            return state
    }
}
