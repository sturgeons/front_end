/** 这个作为一个核心事件，负责全局的数据缓存工作 */
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
