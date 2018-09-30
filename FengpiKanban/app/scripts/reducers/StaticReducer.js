import merge from 'lodash/merge';
import uuid  from 'uuid/v4';

// 本Reducer用来值类型变量，因为引用类型变量每次更细的时候，会引发数据异常
const defaultState = {
    fresh: '',
    edit: false,
    clicked: false,
    showTips: false
}

/**
 * 核心Reducer工具，负责数据模型的保存和计算
 */
export default (state = merge({}, defaultState), action) => {
    const {type, value} = action;

    switch(type) {
        case 'fresh': return merge({}, state, {fresh: uuid()});
        case 'edit': return merge({}, state, {edit: value});
        case 'clicked': return merge({}, state, {clicked: value});
        case 'showTips': return merge({}, state, {showTips: value});
        default: return state;
    }
}
