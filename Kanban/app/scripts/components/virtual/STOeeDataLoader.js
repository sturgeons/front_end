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
        this.props.dataLoading();
        fetch(PREFIX + `SToeedataService/find?LINE=${nextProps.op.line}&OP=${nextProps.op.value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            comp.props.onChangeValue(json.length ? json[0].TOTAL : '');
        }).catch(() => {
            // do something
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
    onChangeValue: (value) => { dispatch(changeValue("oeedata", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    op: state.OPReducer.op,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
