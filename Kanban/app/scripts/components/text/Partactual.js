import React, {Component} from 'react';
import {connect} from 'react-redux';

/**
 * 零件实际生产数量
 */
class comp extends Component {
    render() {
        let number = 0;
        const value = this.props.lastpart.PART_NO;

        // 统计最后生产零件在当班次中共生产了多少
        this.props.datas.map(data => {
            if(data.PARTNO === value) {
                number += data.TOTAL | 0;
            }
        });

        return (
            <input className="form-control fx-input-readonly" readOnly value={number ? number : ''}/>
        )
    }
}

export default connect(
    (state) => ({
        lastpart: state.LastPartReducer.lastpart,
        datas: state.OPDataReducer.opdata
    })
)(comp);
