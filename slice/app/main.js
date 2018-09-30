import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Reducer from 'scripts/reducers';
import StoreBuilder from 'scripts/stores/StoreBuilder';
import App from 'scripts/viewports/App';

/** 创建应用程序存储器 */
const store = StoreBuilder(Reducer);

/** Provider 允许所有的子组件访问Store对象  */
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
