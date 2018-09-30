import merge from 'lodash/merge';

export default (state = {
    workdata: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'workdata':
            return merge({}, value);
        default:
            return state
    }
}
