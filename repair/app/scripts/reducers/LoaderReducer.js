import merge from 'lodash/merge';

const LoaderReducer = (state = {
    loaders: 0
}, action) => {
    switch(action.type){
        case 'addLoader':
            return merge({}, state, {loaders: state.loaders + 1});
        case 'removeLoader':
            return merge({}, state, {loaders: state.loaders - 1});
        default:
            return state
    }
}

export default LoaderReducer
