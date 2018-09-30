import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取最后生产的零件信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const comp = this, {line, value} = nextProps.op;
        this.props.dataLoading();
        fetch(PREFIX + `STdownminuteService/find?LINE=${line}&OP=${value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            nextProps.onChangeValue({ downminute: this._convert(json) });
        }).catch(() => {
            // do something
        }).then(() => {
            comp.props.dataLoaded();
        });
    }

    _convert(json) {
        let result = {};
        json.map(obj => {
            result[parseInt(obj.DOWNCATE)] = obj.DOWNMINUTE;
        });
        return result;
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("downminute", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    op: state.OPReducer.op,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
