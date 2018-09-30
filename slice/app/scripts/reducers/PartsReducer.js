import merge from 'lodash/merge';
import uuid  from 'uuid/v4';

// 本Reducer用来值类型变量，因为引用类型变量每次更细的时候，会引发数据异常
const defaultState = {
    first: [],
    second: [],
    third: []
}

export default (state = merge({}, defaultState), action) => {
    const {type, value} = action;

    if(type === 'parts') {
        let base = 0;
        const diveded = Math.ceil(value.length / 3);
        return merge({}, {
            first: value.slice(base, base = diveded),
            second: value.slice(base, base = base + diveded),
            third: value.slice(base),
        });
    }
    return state
}
