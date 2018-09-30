import merge from 'lodash/merge';

export default (state = {
    validtimes: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'validtimes':
            return merge({}, value);
        default:
            return state
    }
}
