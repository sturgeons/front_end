import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取计班次信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const comp = this;
        nextProps.dataLoading();
        fetch(PREFIX + `STworkminuteService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            nextProps.onChangeValue(json.length ? json[0].VAL : 0);
        }).catch(() => {
            // do something
        }).then(function(){
            nextProps.dataLoaded();
        });
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("workminute", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    op: state.OPReducer.op,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
