import merge from 'lodash/merge';

/**
 * 将数据分开，应为对象类型数据在变更的时候，会触发组件重新渲染
 */
export default (state = {
    line: {
        value: '',
        dbname: ''
    }
}, action) => {
    const {type, value} = action;

    switch(type){
        case 'line':
            return merge({}, value);
        default:
            return state
    }
}
