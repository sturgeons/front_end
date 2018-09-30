import merge from 'lodash/merge';

export default (state = {
    plans: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'plans':
            return merge({}, value);
        default:
            return state
    }
}
