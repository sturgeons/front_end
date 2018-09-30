import merge from 'lodash/merge';

export default (state = {
    opdata: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'opdata':
            return merge({}, value);
        default:
            return state
    }
}
