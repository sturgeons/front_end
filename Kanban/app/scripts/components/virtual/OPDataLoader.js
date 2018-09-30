import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取计班次信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const comp = this, {line, value} = nextProps.op;
        this.props.dataLoading();
        fetch(PREFIX + `STopdataService/find?LINE=${line}&OP=${value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            comp.props.onChangeValue(json);
        }).catch(() => {
            // do something
        }).then(() => {
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
    onChangeValue: (value) => { dispatch(changeValue("opdata", {opdata: value})) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    op: state.OPReducer.op,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
