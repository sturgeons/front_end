import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * 班次产能，根据最后生产的零件信息和当班的有效工作时长，计算计划生产数量
 */
class comp extends Component {
    render() {
        const diff = this.props.shift.DIFF;
        let value = this.props.lastpart.JP;

        if(value) { value = parseInt(diff  * 60 / value); }

        return (
            <input className="form-control fx-input-readonly" readOnly value={value ? value : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        lastpart: state.LastPartReducer.lastpart,
        shift: state.ShiftReducer.shift
    })
)(comp);
