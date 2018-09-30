import merge from 'lodash/merge';

export default (state = {
    datas: []
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'datas':
            return merge({}, value);
        default:
            return state
    }
}
