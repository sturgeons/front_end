import React, {Component} from 'react';
import {connect} from 'react-redux';
import { changeValue } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取最后生产的零件信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        // 没有数据加载且无用户编辑框开着，才能调用自动刷新
        if(nextProps.loaders === 0 && !nextProps.edit && !nextProps.showTips) {
            this.timeout = setTimeout(() => {
                nextProps.onChangeValue();
            }, 300000);
        } else {// 如果有加载器在运行，说明用户有操作动作，需在动作全部执行后在进行自动刷新
            clearTimeout(this.timeout);
        }
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("fresh")) }
});

export default connect((state) => ({
    loaders: state.LoaderReducer.loaders,
    edit: state.StaticReducer.edit,
    showTips: state.StaticReducer.showTips,
    clicked: state.StaticReducer.clicked
}), mapDispatchToProps)(Comp);
