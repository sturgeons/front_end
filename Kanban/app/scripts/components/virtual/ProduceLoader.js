import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取生产信息
 */
class Comp extends Component {
    componentWillMount() {
        this._load({line: '', op: ''});
    }

    componentWillReceiveProps(nextProps) {
        this._load(nextProps.op);
    }

    _load(params) {
        const comp = this;
        this.props.dataLoading();
        fetch(PREFIX + `STchartService/find?LINE=${params.line}&OP=${params.value}`).then((resp) => {
            return resp.json();
        }).then((json) => {
            comp.props.onChangeValue(json.length ? json[0] : {datas: [], keys: []});
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
    onChangeValue: (value) => { dispatch(changeValue("produces", {produce: value})) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    op: state.OPReducer.op,
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
