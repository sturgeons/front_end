import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue, addLoader, removeLoader } from 'scripts/actions';

/**
 * 生产数据
 */
class Comp extends Component {
    componentDidMount() {
        this._load();
    }

    componentWillReceiveProps(nextProps) {
        this._load();
    }

    // 从服务器加载数据
    _load() {
        const comp = this;

        this.props.dataLoading();
        fetch(PREFIX + `STlddataService/find`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let res = [];
            let index = 1;
            json.map(item => {
                res.push({
                    seq: index++,
                    partno: item.PARTNO,
                    qty: item.QTY,
                    qty_min: item.QTY_MIN,
                    line: item.LINE,
                    time: item.TIME,
                    location: item.SHELF,
                    reqty: item.REQTY,
                    pack: item.PACK,
                    op: item.OP,
                    remark: item.REMARK
                });
            });
            comp.props.onChangeValue({datas: res})
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
    onChangeValue: (value) => { dispatch(changeValue("datas", value)) },
    dataLoading: () => { dispatch(addLoader()) },
    dataLoaded: () => { dispatch(removeLoader()) }
});

export default connect((state) => ({
    line: state.StaticReducer.fresh
}), mapDispatchToProps)(Comp);
