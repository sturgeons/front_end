import merge from 'lodash/merge';

export default (state = {
    op: {
        value: '',
        dbname: '',
        line: ''
    }
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'op':
            return merge({}, value);
        default:
            return state
    }
}
