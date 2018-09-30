import merge from 'lodash/merge';
import uuid  from 'uuid/v4';

// 本Reducer用来值类型变量，因为引用类型变量每次更细的时候，会引发数据异常
const defaultState = {
    tips: []
}

export default (state = merge({}, defaultState), action) => {
    const {type, value} = action;
    switch(type) {
        case 'tips': return merge({}, {tips: value});
        default: return state;
    }
}