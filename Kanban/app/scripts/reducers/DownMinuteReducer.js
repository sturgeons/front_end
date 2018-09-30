import merge from 'lodash/merge';

export default (state = {
    downminute: {}
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'downminute':
            return merge({}, value);
        default:
            return state
    }
}
