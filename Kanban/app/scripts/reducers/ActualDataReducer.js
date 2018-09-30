import merge from 'lodash/merge';

export default (state = {
    produce: {
        datas: [],
        keys: []
    }
}, action) => {
    const {type, value} = action;
    switch(type){
        case 'actualDatas':
            return merge({}, value);
        default:
            return state
    }
}
