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
        fetch(PREFIX + `WHreportService/findSimple`).then((resp) => {
            return resp.json();
        }).then((json) => {
            let res = [];
            json.map(item => {
                res.push({
                    fapao_qadno: item.FAPAO_QADNO,
                    fapao_count: item.FAPAO_COUNT,
                    fengpi_count: item.FENGPI_COUNT,
                    fengpi_qadno: item.FENGPI_QADNO,
                    remark: item.REMARK,
                    store_count: item.STORE_COUNT
                });
            });
            comp.props.onChangeValue({datas: res})
        }).catch((e) => {
            // console.log(e);
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
