import * as Types from 'scripts/commons/ActionTypes';
import {history} from 'scripts/commons/History';
import { PREFIX } from 'scripts/commons/Constants';

/** 检测开关的事件 */
export const buttonClick = (id) => (dispatch, getState) => {
    const state = getState().ButtonReducer;
    let keys = Object.keys(state).filter(item => !state[item]);

    dispatch({type: Types.BUTTON_CLICK, id});

    // 初始化主屏幕的时候需要冲洗初始化Reducer缓存，防止数据冲突(等于Redirect操作)
    if(keys.length === 1 && keys[0] === id) {
        return forwardTo('/show');
    }
    // 页面切换到看板初始化页面
    forwardTo('/kanban');
}

/** 在看板应用中，这个作为一个核心事件，负责全局的数据缓存工作 */
export const changeValue = (type, value) => (dispatch, getState) => {
    dispatch({type: type, value});
}

/** 这个最为后台事件存在，负责通知Loading组件，有新的数据要拉取 */
export const addLoader = (type) => (dispatch, getState) => {
    dispatch({type: 'addLoader'});
}

/** 这个最为后台事件存在，负责通知Loading组件， 一个拉取任务完成了，需要从任务列表中移除 */
export const removeLoader = (type) => (dispatch, getState) => {
    dispatch({type: 'removeLoader'});
}

/*************************** 私有方法 *****************************************/

function forwardTo(location) {
    history.push(location, {status: 'show'});
}
