import merge from 'lodash/merge';

export default (state = {
    lineparts: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'lineparts':
            return merge({}, value);
        default:
            return state
    }
}
