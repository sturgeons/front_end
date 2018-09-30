import React, {Component} from 'react';
import {connect} from 'react-redux';
import { PREFIX } from 'scripts/commons/Constants';
import { changeValue } from 'scripts/actions';

/**
 * 这里为实际的生产数据增加计划信息
 */
class Comp extends Component {
    componentWillReceiveProps(nextProps) {
        const validtimes = nextProps.validtimes;
        const jp = nextProps.lastpart.JP;
        const produce = nextProps.produce;

        // 检查基础数据是否已经准备完毕
        if(nextProps.produce.datas.length != validtimes.length){
            return;
        }

        let index = 0;
        validtimes.map(obj => {
            produce.datas[index++]['目标(Target)'] = parseInt(obj.VMINUTE  * 60 / jp);
        });
        this.props.onChangeValue(produce);
    }

    render() {
        return (
            <input type="hidden"/>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeValue: (value) => { dispatch(changeValue("actualDatas", {produce: value})) }
});

export default connect((state) => ({
    produce: state.ProduceReducer.produce,
    validtimes: state.ValidTimesReducer.validtimes,
    lastpart: state.LastPartReducer.lastpart
}), mapDispatchToProps)(Comp);
