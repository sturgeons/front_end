import merge from 'lodash/merge';

export default (state = {
    point: {
        options: [],
        dbname: '',
        line: ''
    }
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'op_caches':
            return merge({}, value);
        default:
            return state
    }
}
