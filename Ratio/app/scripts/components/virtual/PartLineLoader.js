import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 零件到生产线的对应关系
 */
class Comp extends Component {
    componentDidMount() {
        // 增加一段延迟，给Jquery渲染Loading组件保留时间
        setTimeout(() => this._load(), 500);
    }

    componentWillReceiveProps(nextProps) {
        this._load();
    }

    // 从服务器加载数据
    _load() {
        const comp = this;

        this.props.dataLoading();
        fetch(PREFIX + `STpartlineService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            comp.props.onChangeValue({"lineparts": json})
        }).catch(() => {
            // log error
        }).then(function(){
            comp.props.dataLoaded();
        });
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("lineparts", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    line: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
