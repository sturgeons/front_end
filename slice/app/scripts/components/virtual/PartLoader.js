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
        fetch(PREFIX + `SLpartService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let arr = [];
            json.map(obj => {
                arr.push({
                    qadno: obj["QADNO"],
                    remark: obj["REMARK"],
                    amount: obj["AMOUNT"],
                    shelf: obj["SHELF"]
                });
            });
            for(var i = arr.length; i < 72; i++) {
                arr.push({ qadno: '--'});
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
