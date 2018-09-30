import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 这是一个后台任务组件，用来获取最后生产的零件信息
 */
class Comp extends Component {
    componentDidMount() {
        this._load();
    }

    componentWillReceiveProps(nextProps) {
        this._load();
    }

    _load() {
        const comp = this;
        this.props.dataLoading();
        fetch(PREFIX + `JRpartService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let arr = [];
            json.map(obj => {
                arr.push({
                    type: obj["QAD_TYPE"],
                    qad_model: obj["QAD_MODEL"],
                    qadno: obj["QAD_NO"],
                    plan: obj["PLAN_COUNT"],
                    in: obj["IN_COUNT"],
                    out: obj["OUT_COUNT"],
                    min: obj["MIN_COUNT"],
                    max: obj["MAX_COUNT"],
                    cur: obj["CUR_COUNT"]
                });
            });
            for(var i = arr.length; i < 27; i++) {
                arr.push({ type: '--'});
            }
            comp.props.onChangeValue(arr);
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
    onChangeValue: (value) => { dispatch(changeValue("parts", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    fresh: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
