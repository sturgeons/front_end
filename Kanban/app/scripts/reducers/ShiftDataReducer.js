import merge from 'lodash/merge';

export default (state = {
    shiftdatas: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'shiftdatas':
            return merge({}, value);
        default:
            return state
    }
}
