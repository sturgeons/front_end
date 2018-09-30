import merge from 'lodash/merge';

export default (state = {
    downtime: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'downtime':
            return merge({}, value);
        default:
            return state
    }
}
